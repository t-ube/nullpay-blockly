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
  ListItemAvatar,
  Avatar,
  Box,
  Button,
  Fab,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import { v4 as uuidv4 } from 'uuid';
import { loadXmlIntoWorkspace } from '@/utils/BlocklyHelper';
import { FlyoutTheme } from '@/blocks/BlocklyTheme';
import { downloadMlTrainingData, downloadXMLFromText } from '@/utils/BlocklyFileOperations';

const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: '#ABABAB',
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

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
  const divRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const handleBlockEvent = useCallback((event: any) => {
    if (event.type === 'selected' || event.type === 'click' || event.type === 'drag') {
      const workspace = workspaceRef.current;
      if (!workspace) return;
      const blockSvg = workspace.getBlockById(event.blockId);
      if (blockSvg) {
        let parentBlockSvg = blockSvg;
        while (parentBlockSvg.getSurroundParent()) {
          const surroundSvg = parentBlockSvg.getSurroundParent();
          if (surroundSvg) parentBlockSvg = surroundSvg;
        }
        const json = Blockly.serialization.blocks.save(parentBlockSvg);

        const replaceIds = (obj: any): any => {
          if (obj && typeof obj === 'object') {
            if (obj.id) {
              obj.id = `${obj.type}_${uuidv4()}`;
            }
            for (const key in obj) {
              obj[key] = replaceIds(obj[key]);
            }
          }
          return obj;
        };

        const newJson = replaceIds(json);
        const jsonText = JSON.stringify(newJson);
        const blockElement = parentBlockSvg.getSvgRoot();
        const rect = blockElement.getBoundingClientRect();
        const dummyEvent = {
          clientX: rect.left,
          clientY: rect.top
        };
        onBlockSelected(jsonText, event.type, dummyEvent);
      }
    }
  }, [onBlockSelected]);

  useEffect(() => {
    if (!document.getElementById(divId)) return;

    const workspace = Blockly.inject(divId, {
      theme: FlyoutTheme,
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
      try {
        //loadXmlIntoWorkspace(content, workspace);
        //const content = processAIGeneratedXml(content);
        const blockDom = Blockly.utils.xml.textToDom(content);
        Blockly.Xml.clearWorkspaceAndLoadFromXml(blockDom, workspace);

        const allBlocks = workspace.getAllBlocks(false);
        allBlocks.forEach(block => {
          block.contextMenu = false;
        });

      } catch (error) {
        console.error('Failed to load XML into workspace:', error);
        workspace.clear();
        const errorBlock = workspace.newBlock('text');
        errorBlock.setFieldValue('Error: Failed to load XML', 'TEXT');
        errorBlock.initSvg();
        errorBlock.render();
      }

    } else {
      try {
        const json = JSON.parse(content);
        Blockly.serialization.workspaces.load(json, workspace);

        const allBlocks = workspace.getAllBlocks(false);
        allBlocks.forEach(block => {
          block.contextMenu = false;
        });

      } catch (error) {
        console.error('Failed to parse or load JSON:', error);
        workspace.clear();
        const errorBlock = workspace.newBlock('text');
        errorBlock.setFieldValue('Error: Failed to load JSON', 'TEXT');
        errorBlock.initSvg();
        errorBlock.render();
      }
    }

    const calculateArea = () => {
      const blocks = workspace.getAllBlocks(false);
      if (blocks.length === 0) return {width: 0, height: 0};
      const blockSvg = blocks[0].getSvgRoot();
      const blockRect = blockSvg.getBoundingClientRect();
      const rootBlock = blocks[0];
      const lastBlock = blocks[blocks.length - 1];

      const rootBlockMetrics = rootBlock.getHeightWidth();
      const lastBlockMetrics = lastBlock.getHeightWidth();

      const rootY = rootBlock.getRelativeToSurfaceXY().y;
      const lastY = lastBlock.getRelativeToSurfaceXY().y;

      return {width: blockRect.width, height: lastY + lastBlockMetrics.height - rootY};
    };

    const area = calculateArea();
    const margin = 20;
    const containerWidth = area.width;
    const containerHeight = area.height + margin;
    console.log(`width:${containerWidth}/height:${containerHeight}`);
    const container = document.getElementById(divId);
    if (container) {
      container.style.width = `${containerWidth}px`;
      container.style.height = `${containerHeight}px`;
      Blockly.svgResize(workspace);
    }

    const block = workspace.getAllBlocks(false)[0];
    if (block) {
      block.contextMenu = false;
    }

    workspace.addChangeListener(handleBlockEvent);

    return () => {
      workspace.removeChangeListener(handleBlockEvent);
      workspace.dispose();
    };
  }, [content, divId, handleBlockEvent]);

  return (
    <div>
      <div ref={divRef} id={`blockly-div-${index}`} style={{ marginTop: '10px', marginBottom: '10px' }}></div>
    </div>
  );
};


interface IChatGptComponentProps {
  position: { left: number, bottom: number },
  onBlockSelectedV2: (json: string, eventType: string, event: MouseEvent) => void;
}

const ChatGptComponent: React.FC<IChatGptComponentProps> = ({ position, onBlockSelectedV2 }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const listRef = useRef<null | HTMLUListElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const generateBlocklyContent = async (task: string) => {
    try {
      const response = await fetch('/api/chat/langchain/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error('API request failed');
      }

      return data;
    } catch (error) {
      console.error('Error generating code blocks:', error);
      return "An error occurred. Unable to generate code blocks.";
    } finally {
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setIsLoading(true);
      setLastQuery(input);
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');

      try {
        // Dummy 
        /*setTimeout(() => {
          setMessages(prev => [...prev, { text: "This is a mock AI response.", isUser: false }]);
        }, 1000);*/
        const data = await generateBlocklyContent(input);
        setMessages(prev => [...prev, { text: data.explanation, isUser: false, blocklyContent: data.generatedContent }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: "An error occurred while generating the response.", isUser: false }]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleBlockSelected = useCallback((jsonText: string, eventType: string, event: any) => {
    //console.log('Block selected:', jsonText, eventType, event);
    onBlockSelectedV2(jsonText, eventType, event);
    setOpen(false);
  }, [onBlockSelectedV2]);

  const handleRetry = async () => {
    if (lastQuery) {
      setIsLoading(true);
      setMessages(prev => prev.slice(0, -1));
      try {
        const content = await generateBlocklyContent(lastQuery);
        setMessages(prev => [...prev, { text: "Code blocks have been created.", isUser: false, blocklyContent: content }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: "An error occurred while generating the response.", isUser: false }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const downloadJSONL = useCallback((prompt:string, content: string | undefined) => {
    if (content !== undefined) {
      downloadMlTrainingData(prompt, content);
    }
  }, []);

  const downloadXml = useCallback((content: string | undefined) => {
    if (content !== undefined) {
      downloadXMLFromText(content);
    }
  }, []);

  const toggleChat = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      {!open && (
        <StyledFab 
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
        </StyledFab>
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
            <Typography variant="h6">AI Code Generator</Typography>
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
                {!message.isUser && (
                  <ListItemAvatar>
                    <Avatar src="/nullpay-256.png" alt="AI Avatar" />
                  </ListItemAvatar>
                )}
                <Paper elevation={0} sx={{ 
                  p: 1, 
                  maxWidth: '70%', 
                  backgroundColor: message.isUser ? '#e3f2fd' : '#f5f5f5',
                  wordBreak: 'break-word',
                  ml: message.isUser ? 'auto' : 0,
                }}>
                  <ListItemText 
                    primary={message.text.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))} 
                    primaryTypographyProps={{ 
                      sx: { 
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      } 
                    }}
                  />
                </Paper>
              </ListItem>
              <ListItem sx={{ 
                justifyContent: message.isUser ? 'flex-end' : 'flex-start', 
                p: 0.5,
                alignItems: 'flex-start',
                height: 'auto',
              }}>
                {message.blocklyContent && (
                <>
                  <Box sx={{ 
                    justifyContent: 'flex-start', 
                    p: 0.5,
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    height: 'auto',
                    ml: 7,
                    display: 'flex'
                  }}>
                    <Box bgcolor={'#f0f0f0'} padding={3} borderRadius={1} overflow="auto" mb={1}>
                      <BlocklyRenderer 
                        content={message.blocklyContent} 
                        index={index} 
                        onBlockSelected={handleBlockSelected}
                      />
                    </Box>
                    {index === messages.length - 1 && !message.isUser && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {/*<Tooltip title="Download XML">
                        <Button 
                          onClick={() => downloadXml(message.blocklyContent)}
                          sx={{
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            marginRight: 1,
                            padding: 0
                          }}
                        >
                          <DownloadIcon />
                        </Button>
                      </Tooltip>*/}
                      <Tooltip title="Download XML">
                        <Button
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          size="small"
                          onClick={() => downloadXml(message.blocklyContent)}
                          sx={{
                            marginRight: 1,
                          }}
                        >
                          XML
                        </Button>
                      </Tooltip>
                      <Tooltip title="Download JSONL">
                        <Button 
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          size="small"
                          onClick={() => downloadJSONL(message.text, message.blocklyContent)}
                          sx={{
                            marginRight: 1,
                          }}
                        >
                          JSONL
                        </Button>
                      </Tooltip>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleRetry}
                        disabled={isLoading}
                        size="small"
                      >
                        Retry
                      </Button>
                    </Box>
                    )}
                  </Box>
                </>
                )}
              </ListItem>
            </div>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: 'flex-start', p: 0.5 }}>
              <ListItemAvatar>
                <Avatar src="/nullpay-256.png" alt="AI Avatar" />
              </ListItemAvatar>
              <Paper elevation={1} sx={{ p: 1, backgroundColor: '#f5f5f5' }}>
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant="body2">Generating response...</Typography>
                </Box>
              </Paper>
            </ListItem>
          )}
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
              autoComplete="off"
            />
            <IconButton color="primary" onClick={handleSend} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatGptComponent;