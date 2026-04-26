import('@xenova/transformers').then(async ({pipeline}) => {
  const generator = await pipeline('text-generation', 'Xenova/Qwen1.5-0.5B-Chat');
  const out = await generator([{role: 'system', content: 'You are an Offline AI Study Assistant specialized in BTech CSE subjects.'}, {role: 'user', content: 'what is operating system'}], {max_new_tokens: 100});
  console.log(JSON.stringify(out));
}).catch(console.error);
