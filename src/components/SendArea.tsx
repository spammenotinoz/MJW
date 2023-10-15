import { FunctionComponent, useRef, useState } from 'react';
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
  description: string; // You might need to define this prop
}

const SendArea: FunctionComponent<SendAreaProps> = ({
  ifDisabled,
  handleKeydown,
  handleButtonClick,
  handleStopClick,
  clear,
  inputRefItem,
  ifLoading,
  description,
}: SendAreaProps) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [imageUploadSrc, setImageUpload] = useAtom(uploadImagesUrlAtom);
  const [stats, setStats] = useState<string>('');

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-40px md:max-w-[90%] md:w-[560px] sm:w-[90%] lg:w-[50%] backdrop-blur-md pt-1 px-4 pb-4 z-100 text-[16px] rounded-md">
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
          <div className={ifDisabled ? 'op-50 gen-text-wrapper' : 'gen-text-wrapper'}>
            <textarea
              onPaste={handlePaste}
              ref={inputRefItem}
              placeholder={description}
              autoComplete="off"
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
          {/* Centered stats text below the Send and Clear buttons */}
          <div className="text-center my-2">{stats}</div>
        </div>
      )}
    </div>
  );
};

export default SendArea;
