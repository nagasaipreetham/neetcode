/* ── Machine Learning Data ── */

export const ML_TOPICS = [
  {
    name: 'Math Foundation',
    solved: 0, total: 6,
    problems: [
      { id: 'ml-1', name: 'Gradient Descent',             difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-2', name: 'Sigmoid & ReLU',               difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-3', name: 'Softmax',                       difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-4', name: 'Cross-Entropy Loss',            difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-5', name: 'Linear Regression (Forward)',   difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-6', name: 'Linear Regression (Training)',  difficulty: 'Medium', status: 'Not Started' },
    ],
  },
  {
    name: 'Build a Neural Net',
    solved: 0, total: 3,
    problems: [
      { id: 'ml-7', name: 'Single Neuron',      difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-8', name: 'Backpropagation',    difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-9', name: 'MLP from Scratch',   difficulty: 'Medium', status: 'Not Started' },
    ],
  },
  {
    name: 'PyTorch',
    solved: 0, total: 2,
    problems: [
      { id: 'ml-10', name: 'Pytorch Basics',         difficulty: 'Easy', status: 'Not Started' },
      { id: 'ml-11', name: 'Layer Normalization',    difficulty: 'Easy', status: 'Not Started' },
    ],
  },
  {
    name: 'Training',
    solved: 0, total: 2,
    problems: [
      { id: 'ml-12', name: 'Training Loop',    difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-13', name: 'Digit Classifier', difficulty: 'Medium', status: 'Not Started' },
    ],
  },
  {
    name: 'NLP',
    solved: 0, total: 4,
    problems: [
      { id: 'ml-14', name: 'Word Embeddings',                      difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-15', name: 'Intro to Natural Language Processing', difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-16', name: 'Sentiment Analysis',                   difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-17', name: 'Positional Encoding',                  difficulty: 'Easy',   status: 'Not Started' },
    ],
  },
  {
    name: 'Attention and Transformers',
    solved: 0, total: 3,
    problems: [
      { id: 'ml-18', name: 'Self Attention',              difficulty: 'Hard',   status: 'Not Started' },
      { id: 'ml-19', name: 'Multi Headed Self Attention', difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-20', name: 'Transformer Block',           difficulty: 'Medium', status: 'Not Started' },
    ],
  },
  {
    name: 'Build GPT',
    solved: 0, total: 7,
    problems: [
      { id: 'ml-21', name: 'Tokenizer (Byte Pair Encoding)', difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-22', name: 'Build Vocabulary',               difficulty: 'Easy',   status: 'Not Started' },
      { id: 'ml-23', name: 'GPT Data Loader',                difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-24', name: 'GPT Dataset',                    difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-25', name: 'Code GPT',                       difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-26', name: 'Train Your GPT',                 difficulty: 'Medium', status: 'Not Started' },
      { id: 'ml-27', name: 'Make GPT Talk Back',             difficulty: 'Hard',   status: 'Not Started' },
    ],
  },
];

export const ALL_ML_PROBLEMS = ML_TOPICS.flatMap(t => t.problems);

export const ML_FILE_TREE = [
  { type: 'file', name: 'README.md',         badge: 'Auto Generated' },
  { type: 'file', name: 'requirements.txt',  badge: 'Auto Generated' },
  {
    type: 'folder', name: 'model',
    children: [
      { name: 'normalization.py',       desc: 'Layer normalization' },
      { name: 'embeddings.py',          desc: 'Word embeddings' },
      { name: 'positional_encoding.py', desc: 'Positional encoding' },
      { name: 'attention.py',           desc: 'Self-attention head' },
      { name: 'multi_head_attention.py',desc: 'Multi-headed self-attention' },
      { name: 'transformer.py',         desc: 'Transformer block' },
      { name: 'gpt.py',                 desc: 'GPT model' },
    ],
  },
  {
    type: 'folder', name: 'data',
    children: [
      { name: 'nlp_preprocessing.py', desc: 'NLP preprocessing' },
      { name: 'tokenizer.py',         desc: 'BPE tokenizer' },
      { name: 'vocab.py',             desc: 'Character-level encode/decode' },
      { name: 'loader.py',            desc: 'Batched training data' },
      { name: 'dataset.py',           desc: 'GPT dataset preparation' },
    ],
  },
  {
    type: 'folder', name: 'foundations',
    children: [
      { name: 'gradient_descent.py',          desc: 'Gradient descent optimizer' },
      { name: 'activations.py',               desc: 'Activation functions' },
      { name: 'softmax.py',                   desc: 'Softmax function' },
      { name: 'loss.py',                      desc: 'Cross-entropy loss' },
      { name: 'linear_regression.py',         desc: 'Linear regression forward pass' },
      { name: 'linear_regression_training.py',desc: 'Linear regression training' },
      { name: 'neuron.py',                    desc: 'Single neuron forward pass' },
      { name: 'backprop.py',                  desc: 'Backpropagation' },
      { name: 'mlp.py',                       desc: 'MLP from scratch' },
      { name: 'pytorch_basics.py',            desc: 'PyTorch basics' },
      { name: 'training_loop.py',             desc: 'Training loop' },
      { name: 'digit_classifier.py',          desc: 'Digit classifier' },
      { name: 'sentiment.py',                 desc: 'Sentiment analysis' },
    ],
  },
  { type: 'file', name: 'train.py',    desc: 'GPT training loop' },
  { type: 'file', name: 'generate.py', desc: 'Text generation' },
];
