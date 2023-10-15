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
    // ... (other parts of your component state and methods)

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
                // ... (all the textarea properties and event handlers)
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

              {/* Centered stats text below the Send and Clear buttons */}
              <div className="stats-text text-center my-2">{stats}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default SendArea;
