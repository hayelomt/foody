import appConstants from './constants';

const ImageUtils = {
  getUrl: (imgPath: string) => `${appConstants.api}/${imgPath}`,
};

export default ImageUtils;
