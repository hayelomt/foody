const TextUtils = {
  formatOrderCount: (total: number) => (total < 10 ? `${total}` : '9+'),
};

export default TextUtils;
