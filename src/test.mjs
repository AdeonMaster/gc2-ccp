import Jimp from 'jimp';
import Tesseract from 'tesseract.js';

import BlueStacksWindow from './bswindow';

const { createWorker, PSM } = Tesseract;

(async () => {
  // init bs window
  const bswindow = new BlueStacksWindow();
  bswindow.setForeground();

  // get viewport image
  const viewport = bswindow.getViewport();
  const viewportImage = viewport.capture();
  const jimpViewportImage = viewportImage.toJimpImage();

  const currentHP = await jimpViewportImage.clone().crop(108, 47, 62, 15).grayscale().contrast(0.4).invert();
  const maxHP = await jimpViewportImage.clone().crop(176, 47, 62, 15).grayscale().contrast(0.4).invert();
  const currentMP = await jimpViewportImage.clone().crop(108, 63, 62, 14).grayscale().contrast(0.4).invert();
  const maxMP = await jimpViewportImage.clone().crop(176, 63, 62, 14).grayscale().contrast(0.4).invert();

  await currentHP.write('a1.jpg');
  await maxHP.write('a2.jpg');
  await currentMP.write('a3.jpg');
  await maxMP.write('a4.jpg');

  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK
  });

  const { data: { text: text1 } } = await worker.recognize(await currentHP.getBase64Async(Jimp.MIME_JPEG));
  console.log(text1);
  const { data: { text: text2 } } = await worker.recognize(await maxHP.getBase64Async(Jimp.MIME_JPEG));
  console.log(text2);

  const { data: { text: text3 } } = await worker.recognize(await currentMP.getBase64Async(Jimp.MIME_JPEG));
  console.log(text3);
  const { data: { text: text4 } } = await worker.recognize(await maxMP.getBase64Async(Jimp.MIME_JPEG));
  console.log(text4.split('\n'));
})();