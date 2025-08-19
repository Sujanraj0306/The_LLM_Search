import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { ArrowUpward, Language as LanguageIcon, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import TextareaAutosize from "@mui/material/TextareaAutosize";


const websites = [
  { id: 1, name: "google.com" },
  { id: 2, name: "youtube.com" },
  { id: 3, name: "wikipedia.org" },
  { id: 4, name: "reddit.com" },
  { id: 5, name: "stackoverflow.com" },
];

const SearchInput = () => (
  <Paper
    component="form"
    sx={{
      p: "16px 24px",
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "24px",
      backgroundColor: "#303134",
      boxShadow: "none",
      border: "1px solid #3c4043",
      transition: "background-color 0.2s",
      "&:hover": {
        backgroundColor: "#3c4043",
      },
    }}
  >
    <TextareaAutosize
      minRows={1}
      maxRows={7}
      placeholder="Ask anything"
      style={{
        width: "100%",
        resize: "none",
        border: "none",
        outline: "none",
        background: "transparent",
        color: "#e8eaed",
        fontSize: "16px",
        fontFamily: "inherit",
        lineHeight: "1.5",
      }}
    />
    <IconButton
      type="submit"
      sx={{
        p: "8px",
        ml: 2,
        alignSelf: "flex-end",
        backgroundColor: "#131314",
        color: "#e8eaed",
        "&:hover": {
          backgroundColor: "#e8eaed",
          color: "#131314",
        },
      }}
    >
      <ArrowUpward />
    </IconButton>
  </Paper>
);

// Component to render a website's favicon with a fallback
const Favicon = ({ domain }) => {
  const [showFallback, setShowFallback] = useState(false);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  if (showFallback) {
    return <LanguageIcon />;
  }

  return (
    <img
      src={faviconUrl}
      alt={`${domain} favicon`}
      width={20}
      height={20}
      onError={() => setShowFallback(true)}
      style={{ borderRadius: '4px' }}
    />
  );
};


const WebsiteSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const wrapperRef = useRef(null);

  // This effect handles the "click outside" logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSelect = (value) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }} ref={wrapperRef}>
      <Button
        onClick={handleToggle}
        fullWidth
        endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
        sx={{
          mt: 1,
          justifyContent: "space-between",
          textTransform: "none",
          color: "text.secondary",
          backgroundColor: "#303134",
          border: "1px solid #3c4043",
          borderRadius: "12px",
          p: "8px 16px",
          "&:hover": {
            backgroundColor: "#3c4043",
          },
        }}
      >
        {selected.length > 0
          ? `${selected.length} website(s) selected`
          : "Select websites"}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            width: "100%",
            top: "calc(100% + 4px)",
            zIndex: 10,
            backgroundColor: "#3c4043",
            borderRadius: "12px",
          }}
        >
          <List dense sx={{ p: 1 }}>
            {websites.map((website) => {
              const labelId = `checkbox-list-label-${website.id}`;
              return (
                <ListItem
                  key={website.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleSelect(website.id)}
                      checked={selected.indexOf(website.id) !== -1}
                      sx={{ color: "#e8eaed" }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton sx={{ borderRadius: "8px" }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "#e8eaed" }}>
                      {/* Use the new Favicon component here */}
                      <Favicon domain={website.name} />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={website.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Collapse>
    </Box>
  );
};

const MainContent = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
      width: "100%",
      maxWidth: "750px",
      mx: "auto",
      px: 2,
      mt: 20,
    }}
  >
    <Typography
      variant="h2"
      sx={{ fontWeight: "400", mb: 2, fontSize: "3.5rem" }}
    >
     AI Mode
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      Ask questions for better responses
    </Typography>

    <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchInput />
      <WebsiteSelector />
    </Box>
  </Box>
);

export default MainContent;
