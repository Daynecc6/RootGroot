import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";

const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const themeImages = importAll(
  require.context("../../assets/ThemeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const purposeImages = importAll(
  require.context("../../assets/PurposeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const subthemeImages = importAll(
  require.context("../../assets/SubthemeAvatars", false, /\.(png|jpe?g|svg)$/)
);

const fetchStories = async () => {
  const response = await fetch(
    "https://rootgroot-ht6a.onrender.com/api/stories-icons"
  );
  const stories = await response.json();
  return stories;
};

const storyHunterIcon = {
  img: purposeImages["Storyhunter.png"],
  text: "Story-hunter",
  text2: "Tell me more! - ",
};

const extractUniqueIcons = (stories, selectedCountry) => {
  const countries = new Set();
  const purposes = new Set();
  const themes = new Set();
  const subthemes = new Set();

  stories
    .filter((story) => story.country === selectedCountry)
    .forEach((story) => {
      countries.add(story.country);
      purposes.add(story.purpose);
      themes.add(story.theme);
      subthemes.add(story.subtheme);
    });

  return {
    countries: Array.from(countries),
    purposes: Array.from(purposes),
    themes: Array.from(themes),
    subthemes: Array.from(subthemes),
  };
};

export const usePurposePage = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();
  const countryData = location.state.selectedCountry.cca3;

  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [step, setStep] = useState(0);

  const icons = [
    {
      img: purposeImages["Business.jpg"],
      text: "Business",
      text2: "It's my... - ",
    },
    {
      img: purposeImages["Storyhunter.png"],
      text: "Story-hunter",
      text2: "Tell me more! - ",
    },
    {
      img: purposeImages["Storyteller.png"],
      text: "Storyteller",
      text2: "Once upon a time... - ",
    },
    {
      img: purposeImages["Study.jpg"],
      text: "Study",
      text2: "Have fun! - ",
    },
    {
      img: purposeImages["Travel.png"],
      text: "Travel",
      text2: "Let's go! - ",
    },
    {
      img: purposeImages["Volunteer.jpg"],
      text: "Volunteer",
      text2: "I am here for you. - ",
    },
  ];
  const commonThemes = [
    { img: themeImages["Beliefs.png"], text: "Beliefs", text2: "" },
    { img: themeImages["Development.png"], text: "Development", text2: "" },
    { img: themeImages["Education.png"], text: "Education", text2: "" },
    { img: themeImages["Healthcare.png"], text: "Healthcare", text2: "" },
    { img: themeImages["Life Impact.png"], text: "Life Impact", text2: "" },
    { img: themeImages["Politics.png"], text: "Politics", text2: "" },
    { img: themeImages["Regulation.png"], text: "Regulation", text2: "" },
    { img: themeImages["Skills.png"], text: "Skills" },
    { img: themeImages["Social Circle.jpg"], text: "Social Circle", text2: "" },
    { img: themeImages["Social Impact.png"], text: "Social Impact", text2: "" },
    { img: themeImages["Versus.png"], text: "Versus", text2: "" },
  ];

  const subThemes = {
    "Social Circle": [
      {
        img: subthemeImages["Relationship.jpg"],
        text: "Relationship",
        text2: "",
      },
      { img: subthemeImages["Family.jpg"], text: "Family", text2: "" },
      { img: subthemeImages["Community.png"], text: "Community", text2: "" },
    ],
    "Life Impact": [
      {
        img: subthemeImages["Personal sensation.png"],
        text: "Personal Sensation",
        text2: "",
      },
      {
        img: subthemeImages["Physiological needs.png"],
        text: "Physiological Needs",
        text2: "",
      },
      { img: subthemeImages["Challenges.png"], text: "Challenges", text2: "" },
      {
        img: subthemeImages["Consumption.png"],
        text: "Consumption",
        text2: "",
      },
    ],
    Skills: [
      {
        img: subthemeImages["Personal skills.png"],
        text: "Personal Skills",
        text2: "",
      },
      {
        img: subthemeImages["Interpersonal skills.png"],
        text: "Interpersonal Skills",
        text2: "",
      },
    ],
    Development: [
      {
        img: subthemeImages["Personal development.png"],
        text: "Personal Development",
        text2: "",
      },
      {
        img: subthemeImages["Professional development.png"],
        text: "Professional Development",
        text2: "",
      },
      {
        img: subthemeImages["Intercultural competence.png"],
        text: "Intercultural Competence",
        text2: "",
      },
    ],
    Education: [
      { img: themeImages["Education.png"], text: "Education", text2: "" },
    ],
    Beliefs: [{ img: themeImages["Beliefs.png"], text: "Beliefs", text2: "" }],
    "Social Impact": [
      {
        img: subthemeImages["Social justice.png"],
        text: "Social Justice",
        text2: "",
      },
      {
        img: subthemeImages["Human rights.png"],
        text: "Human Rights",
        text2: "",
      },
    ],
    Politics: [
      { img: themeImages["Politics.png"], text: "Politics", text2: "" },
    ],
    Regulation: [
      {
        img: themeImages["Regulation.png"],
        text: "Regulation",
        text2: "",
      },
    ],
    Healthcare: [
      { img: themeImages["Healthcare.png"], text: "Healthcare", text2: "" },
    ],
    Versus: [{ img: themeImages["Versus.png"], text: "Versus", text2: "" }],
  };
  const handleBackClick = () => {
    if (step === 0) {
      navigate("/world-map");
    } else {
      setStep(step - 1);
    }
  };
  const handlePurposeClick = (purpose) => {
    if (purpose === "Story-hunter") {
      navigate("/story-submission");
    } else {
      setSelectedPurpose(purpose);
      setStep(1);
    }
  };

  const handleThemeClick = (icon) => {
    setSelectedTheme(icon);
    setStep(2);
  };

  const navigate = useNavigate();

  const handleSubThemeClick = (subTheme) => {
    navigate("/storypage", {
      state: {
        selectedSubTheme: {
          country: countryData,
          purpose: selectedPurpose,
          theme: selectedTheme,
          subtheme: subTheme,
        },
      },
    });
  };

  const [uniqueIcons, setUniqueIcons] = useState({
    purposes: [],
    themes: [],
    subthemes: [],
  });

  useEffect(() => {
    const fetchAndExtractIcons = async () => {
      const stories = await fetchStories();
      const extractedIcons = extractUniqueIcons(stories, countryData);
      setUniqueIcons(extractedIcons);
    };

    fetchAndExtractIcons();
  }, [countryData]);

  // ...

  // ...

  const filteredIcons = icons.filter(
    (icon) =>
      uniqueIcons.purposes.includes(icon.text) && icon.text !== "Story-hunter"
  );

  const filteredCommonThemes = commonThemes.filter((theme) =>
    uniqueIcons.themes.includes(theme.text)
  );

  const filteredSubThemes = Object.entries(subThemes)
    .filter(([key]) => uniqueIcons.themes.includes(key))
    .reduce((acc, [key, value]) => {
      const filteredSubThemesArray = value.filter((subtheme) =>
        uniqueIcons.subthemes.includes(subtheme.text)
      );
      return { ...acc, [key]: filteredSubThemesArray };
    }, {});

  return {
    theme,
    isSmallScreen,
    location,
    countryData,
    selectedPurpose,
    selectedTheme,
    step,
    filteredIcons,
    filteredCommonThemes,
    filteredSubThemes,
    handleBackClick,
    handlePurposeClick,
    handleThemeClick,
    handleSubThemeClick,
    navigate,
    storyHunterIcon,
  };
};
