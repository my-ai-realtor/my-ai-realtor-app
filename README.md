

# **MyAIRealtor**

MyAIRealtor is a web application prototype designed to empower home buyers through the real estate process. By leveraging generative AI, it simplifies property purchasing, offering transparency, efficiency, and user-friendly tools to enhance the buyer experience.

---

## **Features**

- **Step-by-Step Guidance**
  Navigate the entire real estate process—from identifying properties to closing the deal—with structured workflows, reminders for key milestones, and assistance at every stage.

- **AI-Powered Assistance**
  Use AI to draft and review offers, providing insights and recommendations tailored to your specific property and transaction.

- **Resource Suggestions**
  Get automated suggestions for essential services, including mortgage lenders, inspectors, appraisers, and insurance agents.

- **Empowerment for Buyers**
  Designed for independent buyers who seek control of their real estate journey, MyAIRealtor helps users make informed decisions and save on commission fees.

---

## **How It Works**

1. **Identify a Property**
   Start by entering details about a property you’ve found on platforms like Zillow or Redfin.

2. **Evaluate and Make Offers**
   Prepare, draft, and review offers using AI tools to ensure compliance with industry standards.

3. **Follow Key Milestones**
   Stay organized with real-time reminders for inspections, contract reviews, and escrow deadlines.

4. **Complete the Purchase**
   Get clear guidance on final steps like reviewing disclosures and closing the deal.

---

## **Why Choose MyAIRealtor?**

- **Cost Savings**: Avoid high commission fees with AI-powered insights.
- **Confidence**: Gain clarity and control in the often-complicated home-buying process.
- **Vetted Resources**: Access tools and services tailored to your needs.
- **Innovation**: Explore cutting-edge AI features in a user-focused prototype.

---

## **Limitations and Disclaimers**

MyAIRealtor is a support tool and does not replace professional legal, financial, or real estate advice. Users should consult licensed professionals when needed. While the AI assistant aids decision-making, it does not guarantee offer acceptance or transaction outcomes.

---

## **The Vision Behind MyAIRealtor**

MyAIRealtor was developed to address challenges in the real estate industry:
- A lack of accessible resources for buyers.
- Variability in the quality of real estate agents.
- A desire to democratize the home-buying experience through self-service tools.

By prioritizing buyer empowerment and efficiency, MyAIRealtor aims to redefine how people approach real estate transactions.

---

## **Getting Started**

### Prerequisites
- **Node.js** and **npm** installed on your system.
- Basic understanding of **React** and web development concepts.

### Installation

**MyAIRealtor Prototype Overview**
This prototype was built to explore AI feasibility, integration, and potential features for MyAIRealtor. The project uses the **[meteor-application-template-react](http://ics-software-engineering.github.io/meteor-application-template-react/)**, which includes:

- A standard directory layout with `imports/`, as per the Meteor Guide.
- **Bootstrap 5 React** for UI development.
- **Uniforms** for form handling.
- **alanning:roles** to implement role-based functionality, such as an “Admin” user role.
- **Authorization, Authentication, and Registration** using built-in Meteor packages.
- Initialization of data and users through a settings file.
- Success and error alerts using **Sweet Alert**.
- Code quality assurance with **ESLint**, adhering to the Meteor Coding Standards and AirBnB JavaScript Style Guide.

This template provides a robust foundation for rapid Meteor development, emphasizing prototyping and structured design. We chose this approach based on the time and resources available during development, as well as the team's expertise.

---

### Steps to Run the Application

1. Clone the repository.
2. Install required libraries:
   ```bash
   meteor npm install
   ```
3. Navigate to the app directory:
   ```bash
   cd app/
   ```
4. Start the application:
   ```bash
   meteor npm run start
   ```

This template provides a robust foundation for rapid Meteor development, emphasizing quality assurance and structured design. We chose this approach considering the time and resources available during development, as well as the team's expertise.

We assume developers have completed **ICS 314 - Software Engineering**, as the codebase inherently builds upon concepts covered in that course. For a more in-depth tutorial, please refer to the [meteor-application-template-react documentation](http://ics-software-engineering.github.io/meteor-application-template-react/).

---

### AI Integration Setup

#### Modular AI Design

The AI services are modularized in the application's design, meaning they are not required for the application to run fully. Developers can explore and enable AI functionalities as needed, without affecting the core functionality of the application. This design ensures flexibility and scalability while supporting developers who wish to experiment with or extend the AI capabilities.

Here’s the revised and expanded **Large Language Model Integration** section with your added information included in a professional and organized manner:

---

#### **Large Language Model Integration**

The application includes support for Large Language Model (LLM) integrations, requiring API keys to be configured in the `settings.development.json` file. Below is an example of the configuration:

```json
"private": {
  "openaiApiKey": "yourAPIKeyHere",
  "huggingFaceApiKey": "yourAPIKeyHere"
}
```

#### **Steps to Configure AI Services**
1. **Obtain API Keys**:
   - For OpenAI, retrieve your API key from [OpenAI's platform](https://platform.openai.com/).
   - For Hugging Face, generate your API key from [Hugging Face's website](https://huggingface.co/).

2. **Add API Keys to Configuration**:
   Replace `"yourAPIKeyHere"` with your actual API keys in the `settings.development.json` file. For example:

   ```json
   "private": {
     "openaiApiKey": "sk-abc123...",
     "huggingFaceApiKey": "hf-xyz456..."
   }
   ```

3. **Security Recommendations**:
   To prevent accidental exposure of sensitive information:
   - **Privatize API Keys**: Avoid including sensitive keys directly in public repositories.
   - **Use a `.env` File**: Store your API keys in a `.env` file and load them into the application at runtime. For example:
     ```
     OPENAI_API_KEY=sk-abc123...
     HUGGINGFACE_API_KEY=hf-xyz456...
     ```
     Update your application to dynamically load these keys, ensuring they remain private.

4. **AI Model Map**:
   The `settings.development.json` file includes a `public.modelMap` object to configure available AI models. For instance:

   ```json
   "public": {
     "modelMap": {
       "GPT35": "gpt-3.5-turbo",
       "GPT4": "gpt-4",
       "Llama2": "meta-llama/Llama-2-7b-chat-hf",
       "Falcon": "tiiuae/falcon-7b-instruct",
       "Llama32": "meta-llama/Llama-3.2-1B-Instruct"
     }
   }
   ```

#### **Custom Large Language Model: My-AI-Realtor**

As part of the **MyAIRealtor** platform, we designed and engineered a custom large language model, **My-AI-Realtor**, based on Llama-3.2B. This model is fine-tuned specifically for real estate conversations and tailored to enhance the user experience on the platform.

- **Model Deployment**: The model is hosted on Hugging Face at [My-AI-Realtor Model](https://huggingface.co/caslabs/my-ai-realtor). Developers can:
  - Utilize their Hugging Face account to deploy the model through Hugging Face services.
  - Use the "Use this model" option to download and run the model locally cost-free using Hugging Face tools.

- **Recommended Approach**:
  We recommend using **Ollama** for local development and experimentation with the My-AI-Realtor language model.

#### **Using Ollama for Local Inference**
1. Download Ollama and follow the tutorial at [Ollama](https://ollama.com/).
2. After setup, run the following command to infer locally:
   ```bash
   ollama run hf.co/caslabs/my-ai-realtor
   ```

#### **Conversational Dataset**
The model was trained and fine-tuned using a curated conversational dataset, specifically designed to reduce hallucinations and align with the **MyAIRealtor** platform’s needs.

- **Dataset**: [Real Estate Conversation Dataset](https://huggingface.co/datasets/caslabs/real-estate-conversation)
  Developers can download and extend this dataset to include additional conversations for more accurate and tailored performance.

- **Training Process**:
  Detailed training and fine-tuning steps are documented in the repository:
  [Llama_3_2_1B+3B Conversational Fine-tuning Notebook](https://github.com/my-ai-realtor/my-ai-realtor-labs/blob/main/Llama_3_2_1B%2B3B_Conversationa_finetuning.ipynb).


#### Machine Model Integration

For the AI realization of MyAIRealtor, we explored an additional approach by embedding a classical machine learning model into the process. This prototype ML model, designed to predict home prices, serves as a demonstration of how AI can enhance decision-making in real estate.

Inference API: Home Price Predictor Mockup
Explore the live inference API to understand how the model operates and delivers predictions.

Source Code: GitHub Repository
Dive into the repository for detailed insights into the model’s engineering, data synthesis, and the methodologies used to design and train it.

We’ve integrated this model within the application code to showcase how such AI components can be utilized effectively. For an in-depth understanding of the integration process, as well as the data preparation and model architecture, refer to the documentation provided in the repository.
