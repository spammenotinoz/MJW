import { FunctionComponent, useEffect, useRef, useState, useMemo } from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import ClearIcon from './icons/Clear';
import UploadImage from '@/components/UploadImage';
import { useAtom } from 'jotai';
import { uploadImagesUrlAtom } from '@/hooks/useUplodImage';

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
    const [stats, setStats] = useState<string>(''); // Initialize stats as an empty string

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

    // Function to fetch and update the stats every 5 minutes
    const fetchAndUpdateStats = async () => {
      try {
        // Make an HTTP request to fetch the stats data
        const response = await fetch('/stats.txt');
        if (response.ok) {
          const statsData = await response.text();
          // Update the stats
          setStats(statsData);
        } else {
          console.error('Failed to fetch stats data');
        }
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };

    // Update the stats initially and every 5 minutes (300,000 milliseconds)
    useEffect(() => {
      fetchAndUpdateStats(); // Fetch initially
      const intervalId = setInterval(fetchAndUpdateStats, 300000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="fixed inset-x-0 bottom-40px backdrop-blur-md pt-1 px-4 pb-4 z-100 text-[16px] rounded-md">
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
            {/* Center the stats text on a new row */}
            <div className="text-center mt-2">{stats}</div>
          </div>
        )}
      </div>
    );
  }
);

export default SendArea;
