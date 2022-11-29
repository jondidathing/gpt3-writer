import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);

const openai = new OpenAIApi(configuration)
const basePromptPrefix = `
Write me a detailed meal plan of only that location's local iconic dishes for breakfast, lunch and dinner based on the height, weight, gender, dietary requirements, goal, age and location while taking into considersation the duration of stay at that specific location. Label each day like: Day 1.
Meal Plan:
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion(
        {
            model: 'text-davinci-002',
            prompt: `${basePromptPrefix}${req.body.userInput}\n`,
            temperature: 0.95,
            max_tokens: 705           
        }
    )

    const basePromptPreOutput = baseCompletion.data.choices.pop()
    
    res.status(200).json(
        {
            output: basePromptPreOutput
        }
    );

};

export default generateAction;