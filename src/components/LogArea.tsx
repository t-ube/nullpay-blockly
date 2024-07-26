// components/LogArea.tsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, ForwardedRef } from 'react';

const MAX_LOG_LINES = 1000;

export interface LogAreaHandle {
  append: (text: string) => void;
  clear: () => void;
}

interface LogAreaProps {
}

const LogArea = forwardRef<LogAreaHandle, LogAreaProps>((props, ref: ForwardedRef<LogAreaHandle>) => {
    const [logLines, setLogLines] = useState<string[]>([]);
    const logBuffer = useRef<string[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
    useImperativeHandle(ref, () => ({
      append: (text: string) => {
        logBuffer.current.push(...text.split('\n'));
      },
      clear: () => {
        setLogLines([]);
        logBuffer.current = [];
      }
    }));
  
    useEffect(() => {
      const flushLogInterval = setInterval(() => {
        if (logBuffer.current.length > 0) {
          setLogLines(prevLines => {
            const newLines = [...prevLines, ...logBuffer.current];
            logBuffer.current = [];
            if (newLines.length > MAX_LOG_LINES) {
              return newLines.slice(-MAX_LOG_LINES);
            }
            return newLines;
          });
        }
      }, 1000);
  
      return () => clearInterval(flushLogInterval);
    }, []);
  
    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
      }
    }, [logLines]);
  
    return (
      <textarea 
        ref={textAreaRef}
        className="px-1 w-full h-full resize-none border"
        style={{ fontSize: '12px' }}
        readOnly
        spellCheck="false"
        value={logLines.join('\n')}
      />
    );
  });
  
  LogArea.displayName = 'LogArea';
  
  export default LogArea;