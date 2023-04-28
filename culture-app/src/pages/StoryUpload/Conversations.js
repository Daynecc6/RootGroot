import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Conversations({
  formData,
  currentConversation,
  handleConversationChange,
  addConversation,
  deleteConversation,
  onDragEnd,
}) {
  // Render the conversations component
  return (
    <>
      <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
        <Typography variant="h6">Conversations</Typography>
      </Box>
      <TextField
        fullWidth
        label="Speaker"
        name="speaker"
        value={currentConversation.speaker}
        onChange={handleConversationChange}
        sx={{ mt: 2, mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Message"
        name="message"
        value={currentConversation.message}
        onChange={handleConversationChange}
        sx={{ mt: 2, mb: 2 }}
      />
      <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={addConversation}>
          Add Conversation
        </Button>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="conversation">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {formData.conversations.map((conversation, index) => (
                <Draggable
                  key={index}
                  draggableId={`conversation-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemText
                        primary={`${conversation.speaker}: ${conversation.message}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteConversation(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Conversations;
