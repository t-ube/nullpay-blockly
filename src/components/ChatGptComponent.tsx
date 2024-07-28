import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Blockly from 'blockly';
import { 
  Paper, 
  TextField, 
  IconButton, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  Fab,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

interface Message {
  text: string;
  isUser: boolean;
  blocklyContent?: string;
}

interface BlocklyRendererProps {
  content: string;
  index: number;
  onBlockSelected: (jsonText: string, eventType: string, event: any) => void;
}

const BlocklyRenderer: React.FC<BlocklyRendererProps> = ({ content, index, onBlockSelected }) => {
  const divId = `blockly-div-${index}`;
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!document.getElementById(divId)) return;

    const workspace = Blockly.inject(divId, {
      readOnly: false,
      scrollbars: false,
      zoom: {
        controls: false,
        wheel: false,
        startScale: 0.75,
      },
    });
    workspaceRef.current = workspace;

    // Check if the content is XML or JSON
    const isXml = content.trim().startsWith('<');

    if (isXml) {
      const blockDom = Blockly.utils.xml.textToDom(content);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);
    } else {
      try {
        const json = JSON.parse(content);
        Blockly.serialization.workspaces.load(json, workspace);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }

    const block = workspace.getAllBlocks(false)[0];
    if (block) {
      block.contextMenu = false;
      const blockSvg = block.getSvgRoot();
      if (blockSvg) {
        const blockRect = blockSvg.getBoundingClientRect();
        const container = document.getElementById(divId);
        if (container) {
          container.style.width = `${blockRect.width}px`;
          container.style.height = `${blockRect.height + 100}px`;
        }
      }
    }

    const handleBlockEvent = (event: any) => {
      if (event.type === 'selected' || event.type === 'click' || event.type === 'drag') {
        const blockSvg = workspace.getBlockById(event.blockId);
        if (blockSvg) {
          let parentBlockSvg = blockSvg;
          while (parentBlockSvg.getSurroundParent()) {
            const surroundSvg = parentBlockSvg.getSurroundParent();
            if (surroundSvg) parentBlockSvg = surroundSvg;
          }
          const json = Blockly.serialization.blocks.save(parentBlockSvg);
          const jsonText = JSON.stringify(json);
          const blockElement = parentBlockSvg.getSvgRoot();
          const rect = blockElement.getBoundingClientRect();
          const dummyEvent = {
            clientX: rect.left,
            clientY: rect.top
          };
          onBlockSelected(jsonText, event.type, dummyEvent);
        }
      }
    };
    workspace.addChangeListener(handleBlockEvent);

    return () => {
      workspace.removeChangeListener(handleBlockEvent);
      workspace.dispose();
    };
  }, [content, divId, onBlockSelected]);

  return <div id={divId} style={{ marginTop: '10px', marginBottom: '10px' }}></div>;
};


interface IChatGptComponentProps {
  position: { left: number, bottom: number }
}

const ChatGptComponent: React.FC<IChatGptComponentProps> = ({ position }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const listRef = useRef<null | HTMLUListElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const workspaceRefs = useRef<{ id: string; workspace: Blockly.WorkspaceSvg }[]>([]);

  const generateBlocklyContent = async (task: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.generatedContent;
    } catch (error) {
      console.error('Error generating Blockly blocks:', error);
      return "An error occurred. Unable to generate Blockly blocks.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');

      const content = await generateBlocklyContent(input);
      console.log(content);
      setMessages(prev => [...prev, { text: "Generated Blockly blocks.", isUser: false, blocklyContent: content }]);
      // Dummy 
      /*setTimeout(() => {
        setMessages(prev => [...prev, { text: "This is a mock AI response.", isUser: false }]);
      }, 1000);*/
    }
  };
  
  const handleBlockSelected = useCallback((jsonText: string, eventType: string, event: any) => {
    console.log('Block selected:', jsonText, eventType, event);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setOpen(!open);

  return (
    <>
      {!open && (
        <Fab 
          color="primary" 
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            position: 'fixed',
            bottom: position.bottom,
            left: position.left,
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </Fab>
      )}
      {open && (
        <Paper 
          elevation={3} 
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 700,
            height: 500,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Chat</Typography>
            <IconButton size="small" color="inherit" onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List ref={listRef} sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: 1,
        '& ul': { padding: 0 },
      }}>
        {messages.map((message, index) => (
          <div key={index}>
            <ListItem sx={{ 
              justifyContent: message.isUser ? 'flex-end' : 'flex-start', 
              p: 0.5,
              alignItems: 'flex-start'
            }}>
              <Paper elevation={1} sx={{ 
                p: 1, 
                maxWidth: '70%', 
                backgroundColor: message.isUser ? '#e3f2fd' : '#f5f5f5',
                wordBreak: 'break-word'
                }}>
                  <ListItemText 
                    primary={message.text} 
                    primaryTypographyProps={{ 
                      sx: { 
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      } 
                    }}
                  />
              </Paper>
            </ListItem>
            <ListItem key={index} sx={{ 
              justifyContent: message.isUser ? 'flex-end' : 'flex-start', 
              p: 0.5,
              alignItems: 'flex-start'
            }}>
              {message.blocklyContent && (
                <BlocklyRenderer 
                  content={message.blocklyContent} 
                  index={index} 
                  onBlockSelected={handleBlockSelected}
                />
              )}
            </ListItem>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </List>
          <Box sx={{ p: 2, display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="What kind of code would you like to generate?"
          />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatGptComponent;