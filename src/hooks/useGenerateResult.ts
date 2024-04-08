import { ChatMessage, ErrorMessage } from '../../types';
import { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { ChatMessageProcessor } from '@/utils/Chat/ChatMessageProcessor';
import { ShowLicenseFromAtom } from '@/hooks/useLayout';
import {
  mjImageByPrompt,
  mjImageDescribe,
  mjImageUpReroll,
  mjImageUpScale,
  mjImageUpVariate,
  mjImageBlend,
} from "@/apis/image";
import { ifTaskOnWorkingAtom, setTaskIdAtom } from '@/hooks/useTaskInfo';

function formatMsgBody(body: ChatMessage[], isFree = true): ChatMessage[] {
  const instance = new ChatMessageProcessor(body, isFree ? 'free' : 'paid', 2000, 200);
  return instance.senderMessages;
}

export const useGenerateResult = () => {
  const [currentError, setCurrentError] = useState<ErrorMessage>();
  const [, showLicenseEdit] = useAtom(ShowLicenseFromAtom);
  const [generatedResults, setGeneratedResults] = useState<ChatMessage>({
    role: 'assistant',
    content: '',
  });
  const [, setTaskId] = useAtom(setTaskIdAtom);
  const [, setWorking] = useAtom(ifTaskOnWorkingAtom);
  const isStreamingRef = useRef<boolean>(true);

  async function generate(body: ChatMessage): Promise<any> {
    setCurrentError(undefined);
    let response: any;
    try {
      const action = body.action;
      if (action === 'IMAGINE') {
        response = await mjImageByPrompt(body.content);
        if (response?.description?.includes("Banned prompt detected")) {
          throw new Error("Banned prompt detected");
        }
      } else if (action === 'VARIATION') {
        response = await mjImageUpVariate(
          body.actionInfo?.taskId ?? '',
          body.actionInfo?.index ?? 1,
        );
      } else if (action === 'UPSCALE') {
        response = await mjImageUpScale(
          body.actionInfo?.taskId ?? '',
          body.actionInfo?.index ?? 1,
        );
      } else if (action === 'REROLL') {
        response = await mjImageUpReroll(
          body.actionInfo?.taskId ?? '',
        );
      } else if (action === 'DESCRIBE') {
        if (!body.uploadImages) return;
        response = await mjImageDescribe(body.uploadImages[0]);
      } else if (action === 'BLEND') {
        if (!body.uploadImages) return;
        response = await mjImageBlend(body.uploadImages);
      }

      console.log(response);

      if (response?.code !== 1) {
        throw new Error(response?.description || 'Unknown error');
      }

      setTaskId(response?.result);
      setWorking(true);

      return response?.result;
    } catch (error) {
      const errorResponse = error as ErrorMessage;
      setCurrentError(error as any);
      setWorking(false);
      throw error;
    }
  }

  function stopStream() {
    setWorking(false);
  }

  return { generatedResults, generate, stopStream, currentError };
};