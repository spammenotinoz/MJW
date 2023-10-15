import { FunctionComponent, useEffect, useRef, useState, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import ClearIcon from './icons/Clear';
import UploadImage from '@/components/UploadImage';
import { useAtom } from 'jotai';
import { uploadImagesUrlAtom } from '@/hooks/useUplodImage';

// Import the stats constant from the stats.js file
import { stats } from './stats';

interface SendAreaProps {
  handleKeydown: (e: KeyboardEvent) => void;
  handleButtonClick: () => void;
  handleStopClick: () => void;
  clear: () => void;
  inputRefItem: any;
  ifLoading: boolean;
  ifDisabled: boolean;
}

const SendArea: FunctionComponent<SendAreaProps> = forwardRef(
  (
    {
      ifDisabled,
      handleKeydown,
      handleButtonClick,
      handleStopClick,
      clear,
      inputRefItem,
      ifLoading,
    }: SendAreaProps,
    ref
  ) => {
    const textareaRef = useRef(null);
    const [imageSrcs, setImageSrcs] = useState<string[]>([]);
    const [imageUploadSrc, setImageUpload] = useAtom(uploadImagesUrlAtom);

    useEffect(() => {
      setImageUpload(imageSrcs);
      // if(imageSrcs.length===0) return
      console.log(imageSrcs);
    }, [imageSrcs]);

    const handlePaste = (event: any) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      const imageFiles = [] as any;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          const imageUrl = URL.createObjectURL(file);
          imageFiles.push(imageUrl);
        }
      }
      setImageSrcs([...imageSrcs, ...imageFiles]);
    };

    function emptyImagesSrc() {
      setImageSrcs([]);
    }

    useImperativeHandle(ref, () => ({
      emptyImagesSrc,
    }));

    const handleDeleteByIndex = (index: number) => {
      const newImageSrcs = [...imageSrcs];
      newImageSrcs.splice(index, 1);
      setImageSrcs(newImageSrcs);
    };

    const description = useMemo(() => {
      const imageLength = imageSrcs.length;
      return imageLength > 0
        ? imageLength > 1
          ? `Click Send to Blend ${imageLength} uploaded images`
          : `Click Send to describe 1 uploaded image`
        : 'Enter image description here...';
    }, [imageSrcs]);

    const inDescriptionOrBlend = useMemo(() => {
      const imageLength = imageSrcs.length;
      return imageLength > 0;
    }, [imageSrcs]);

    // Function to update the stats every 5 minutes
    const updateStats = () => {
      // Fetch new stats data or update the stats string as needed
      // For simplicity, we'll just append a timestamp to the existing stats
      const updatedStats = `${stats} (Last updated: ${new Date().toLocaleTimeString()})`;
      // Update the stats
      setStats(updatedStats);
    };

    // Update the stats every 5 minutes (300,000 milliseconds)
    useEffect(() => {
      const intervalId = setInterval(updateStats, 300000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-40px md:max-w-[90%] md:w-[560px] sm:sm:w-[90%] backdrop-blur-md pt-1 px-4 pb-4 z-100 text-[16px] rounded-md">
        {ifLoading ? (
          <div className="gen-cb-wrapper">
            <span>Thinking...</span>
            <div className="gen-cb-stop" onClick={handleStopClick}>
              Stop
            </div>
          </div>
        ) : (
          <div>
            {imageSrcs.length > 0 && (
              <div className="pt-2">
                <UploadImage
                  images={imageSrcs}
                  handleDelete={(index: any) => {
                    handleDeleteByIndex(index);
                  }}
                ></UploadImage>
              </div>
            )}
            <div
              className={
                ifDisabled ? 'op-50 gen-text-wrapper' : 'gen-text-wrapper'
              }
            >
              <textarea
                onPaste={handlePaste}
                ref={inputRefItem}
                placeholder={description}
                autoComplete="off"
                // @ts-ignore
                onKeyDown={handleKeydown}
                disabled={ifDisabled || inDescriptionOrBlend}
                autoFocus
                onInput={() => {
                  inputRefItem.current.style.height = 'auto';
                  inputRefItem.current.style.height = `${inputRefItem.current.scrollHeight}px`;
                }}
                className="gen-textarea"
                rows={1}
              />
              <button
                onClick={handleButtonClick}
                disabled={ifDisabled}
                className="gen-slate-btn"
              >
                Send
              </button>
              <button
                title="Clear"
                onClick={clear}
                disabled={ifDisabled}
                className="gen-slate-btn"
              >
                <ClearIcon />
              </button>
            </div>

            {/* Display the stats text below the send icon */}
            <div className="stats-text">{stats}</div>
          </div>
        )}
      </div>
    );
  }
);

export default SendArea;
