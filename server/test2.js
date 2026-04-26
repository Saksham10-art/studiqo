import('@xenova/transformers').then(async ({pipeline}) => {
  const generator = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat');
  
  const systemPrompt = `You are an Offline AI Study Assistant specialized in BTech CSE subjects (OS, CN, DBMS, TOC, Compiler Design, Architecture, DSA).
Your job is to generate clear, simple, and exam-oriented answers.
- Always answer in simple English.
- If question is theoretical -> give Definition, Explanation, and Example.
- If question is numerical -> give step-by-step solution.
- If question is short -> give 2-5 mark answer format.
- If question is long -> give structured answer with headings.
- If question is outside syllabus -> say "This is outside BTech CSE syllabus, but here is a basic explanation..."`;

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'hi' },
    { role: 'assistant', content: '[Local AI]: Hello Assistant.' },
    { role: 'user', content: 'what is operating system' }
  ];

  const output = await generator(apiMessages, { max_new_tokens: 500 });
  const generatedMessages = output[0].generated_text;
  const finalReply = generatedMessages[generatedMessages.length - 1].content;
  console.log("FINAL REPLY:", finalReply);
}).catch(console.error);
