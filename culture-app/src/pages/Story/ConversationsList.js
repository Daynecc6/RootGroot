import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";

const speakerIcons = {
  PROF: require("./SpeakerIcons/AK.png"),
  AK: require("./SpeakerIcons/Professor.png"),
};

const Bubble = styled("div")(({ theme, sender }) => ({
  display: "inline-block",
  borderRadius: 12,
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  background: sender ? "#000" : "#fff",
  color: sender ? "#fff" : "#000",
  marginLeft: sender ? theme.spacing(-5) : 100,
  marginRight: sender ? 100 : theme.spacing(-2),
  boxShadow: sender ? "none" : "0 2px 5px rgba(0, 0, 0, 0.3)",
}));

const getSpeakerPosition = (conversations, currentSpeaker) => {
  const firstSpeaker = conversations[0]?.speaker;
  return firstSpeaker === currentSpeaker;
};

const ConversationsList = ({ conversations, currentConversationStep }) => (
  <div
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <List sx={{ maxWidth: 600 }}>
      {conversations
        .slice(0, currentConversationStep + 1)
        .map((conversation) => {
          const isFirstSpeaker = getSpeakerPosition(
            conversations,
            conversation.speaker
          );

          return (
            <ListItem
              key={conversation.id}
              alignItems="flex-start"
              sx={{
                flexDirection: isFirstSpeaker ? "row" : "row-reverse",
                "& .MuiListItemAvatar-root": {
                  marginLeft: isFirstSpeaker ? 0 : 1,
                  marginRight: isFirstSpeaker ? 1 : 0,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={speakerIcons[conversation.speaker]}
                  sx={{
                    width: (theme) => theme.spacing(8), // 8 * 8px = 64px
                    height: (theme) => theme.spacing(8), // 8 * 8px = 64px
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isFirstSpeaker ? "flex-start" : "flex-end",
                  },
                }}
                primary={conversation.speaker}
                secondary={
                  <Bubble sender={isFirstSpeaker}>
                    {conversation.message}
                  </Bubble>
                }
                sx={{
                  textAlign: "center",
                  "& .MuiListItemText-primary": {
                    textAlign: "center",
                    marginLeft: isFirstSpeaker ? 0 : "auto",
                    marginRight: isFirstSpeaker ? "auto" : 0,
                  },
                }}
              />
            </ListItem>
          );
        })}
    </List>
  </div>
);

export default ConversationsList;
