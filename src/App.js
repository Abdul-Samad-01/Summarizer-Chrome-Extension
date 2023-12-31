/*global chrome*/

import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import copy from "./assets/copy-icon.png";
import tick from "./assets/tick-icon.png";
import LanguageDropdown from "./component/LanguageDropdown";

function App() {
  const [text, setText] = useState();
  const [primarytext, setPrimaryText] = useState();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language


  // Create OpenAI configuration
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Copy text to clipboard and handle success
  const handleCopy = (text) => {
    setCopied(text);
    const structuredText = text.replace(/<\/?strong>/g, '').replace(/<br\s?\/?>/g, '\n');

    navigator.clipboard.writeText(structuredText);
    setTimeout(() => setCopied(false), 3000);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };

  // Get valid length text
  const getValidLengthText = (text) => {
    const validLength = 4 * 3200;
    return text.substr(0, validLength)
  }

  // Get inner HTML of the active tab
  async function getCurrentTabHtml() {
    let queryOptions = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(queryOptions);

    let result;
    try {
      [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => document.documentElement.innerText,
      });
    } catch (e) {
      console.log(e)
    }

    return result;
  }

  // Fetch summary from OpenAI API
  const fetchSummary = async () => {
    setLoading(true);

    // Get and parse inner html of active tab
    const tabInnerHtmlText = await getCurrentTabHtml();
    const validPrompt = getValidLengthText(tabInnerHtmlText);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Think step by step and provide a clear, concise, yet comprehensive summary of the provided content. Your task is to distill the content into a structured written format, using markdown for readability and organization.

      In your summary, please ensure to:
      
      1. **Include the content's main title**: Provide the context and idea about the content, if available.
      2. **Identify and summarize the key points/highlights**: List primary points, arguments, discoveries, or themes. Consider these as the 'need-to-know' points for understanding the core message.
      3. **Provide detail without losing clarity**: After the key points, provide a detailed summary. Include significant sub-points, examples, discussions, conclusions, or implications. This section should complement the key points.
      4. **Structure your summary with markdown**: Use headers for different sections (e.g., Key Points, Detailed Summary), bullet points for listing, bold/italic text for emphasis, and tables if needed.
      5. **Capture the content's essence without unnecessary length**: Balance detail and brevity. Avoid overly long sentences and excessive detail.
      
      Goal: Ensure someone reading your summary gains a complete understanding of the content, even if they haven't watched it. If content has crucial visuals (e.g., graphs, diagrams), briefly describe them in the summary.
      
      Template:
      <strong>[Title]</strong><br />
      
      <strong>TLDR</strong><br />
      (Summarize content in 3 sentences)<br />
      <br />
      <strong>Key Points/Highlights</strong><br />
      - Main Point/Highlight 1<br />
      - Main Point/Highlight 2<br />
      - Main Point/Highlight 2<br />
      
      
      <strong>Detailed Summary</strong><br />
      (Expand on key points with sub-points, examples, discussions, conclusions and give summary within 150 words)<br />
      
      <strong>Conclusion</strong><br />
      (Any content conclusions, speaker's final thoughts)<br />
      
      AI-Generated Summary:<br />
      <strong>AI-Generated Summary</strong><br />
      [AI-generated summary text goes here]` +
        `The content is as follows: ${validPrompt}`,
      temperature: 0.7,
      max_tokens: 600,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setText(response.data.choices[0].text);
    setPrimaryText(response.data.choices[0].text);
    setLoading(false);
  };

  // Translate text using OpenAI API
  const translateText = async () => {
    setLoading(true);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate the following text from English to ${selectedLanguage}. Ensure that the translation maintains the meaning and context of the original text. Avoid overly literal translations and dont disturb the html tags leave as it is just translate remaining text without affecting the text structure. Feel free to paraphrase and use natural language to convey the essence of the content.\n\nOriginal Text:\n"${primarytext}":
      "${primarytext}"`,
      temperature: 0.7,
      max_tokens: 400,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setText(response.data.choices[0].text)
    setLoading(false);
  };




  return (
    <div className="container">
      <div className='gradient' />
      <h4 className='head_text'>
        Summarize Web Pages with <br />
        <span className='beautiful_gradient '>Artificial Intelligence</span>
      </h4>
      <button
        className="summarizer-button"
        onClick={fetchSummary}
        disabled={loading}
      >
        {loading ? <div className="loader"></div> : <>Summarize</>}
      </button>

      <div className='article-summary-container'>
        <div className='summary-box-header'>
          <h2 className='article-title'>
            WebPage <span className='blue-gradient-text'>Summary</span>
          </h2>
          <div className='copy_btn' onClick={() => handleCopy(text)}>
            <img
              src={copied === text ? tick : copy}
              alt={copied === text ? "tick" : "copy"}
              className='copyElement'
            />
          </div>
        </div>
        <div className='summary-box'>
          <div className='summary-text' dangerouslySetInnerHTML={{ __html: text }} />

        </div>
      </div>
      <div className="translater-box">
        <LanguageDropdown selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
        <button className="translate-button" onClick={translateText}>Translate</button>
      </div>
    </div>
  );
}

export default App;
