# Summarizer Chrome Extension

Summarizer is a powerful Chrome extension that harnesses the capabilities of GPT-3 AI to simplify your web browsing experience. With Summarizer, you can generate concise summaries, extract key points and highlights, and obtain the main title of any webpage you're currently browsing. This extension is designed to save you time and help you quickly grasp the essence of online content.

## Features

- **Webpage Summaries**: Summarizer enables you to create shortened summaries for any web page you're viewing. Whether it's a news article, a blog post, or any other text-based content, Summarizer distills the key information into a concise format.

- **Title Extraction**: Automatically extract the main title of the webpage to provide context for the summary. This feature is particularly useful when you want to understand the focus of the content at a glance.

- **Key Points and Highlights**: Summarizer identifies and lists the primary key points, arguments, discoveries, or themes from the content. These highlights offer a quick overview of the main ideas.

- **Quick and Intuitive**: With a simple click, you can initiate the summarization process. Summarizer works seamlessly within your browser, enhancing your reading experience without disrupting your workflow.

## Getting Started

1. **Build the Extension**: Start by running the command `npm run build` to build the extension.

2. **Install Extension Locally**: Import the generated **build** folder into your local Chrome extensions. Navigate to `chrome://extensions/` in your browser, enable Developer Mode, and load the extension using the **Load unpacked** option.

3. **Obtain Your GPT-3 API Key**: Visit the OpenAI website to obtain your GPT-3 API key. Insert the key as the value of **REACT_APP_OPENAI_API_KEY** in the `.env` file of your project.

4. **Start Summarizing**: Navigate to any text-based webpage that you want to summarize. Click the "Summarize" button, and Summarizer will provide you with a succinct summary, key points, highlights, and the main title of the content.

## See Summarizer in Action

![Summarizer Screenshot](./src/assets/Screenshot%202023-08-26%20161544.png)
*Above: A screenshot demonstrating Summarizer in action.*

## Use Cases

- **News Articles**: Quickly catch up on the latest news by generating summaries of news articles from various sources.

- **Research**: Extract key information from research papers, articles, and online resources to aid in your studies.

- **Blogs and Content Curation**: Curate content for your blog or social media by efficiently summarizing relevant articles.

## Limitations

Summarizer's performance is optimized for text-heavy content such as blogs, articles, and news stories. While it provides valuable summaries for various websites, its effectiveness may vary based on the content type.

## Give It a Try!

Simplify your web browsing and enhance your reading efficiency with the Summarizer Chrome Extension. Enjoy a quick grasp of content without sacrificing depth.

Happy summarizing!
