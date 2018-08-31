
import EXIF from 'exif-js'; // 引入依赖插件

// 参数列表：img 对象，callback返回Base64图片编码，生成图片质量默认值0.9
export const FixImg = (img, callback, quality = 0.9) => {
    
  let Orientation, ctxWidth, ctxHeight, base64; // 定义所需变量

  EXIF.getData(img, function() {
    Orientation = EXIF.getTag(this, 'Orientation');
    ctxWidth = this.naturalWidth;
    ctxHeight = this.naturalHeight;
    
    console.log(Orientation, ctxWidth, ctxHeight);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = ctxWidth;
    canvas.height = ctxHeight;
    if ([5, 6, 7, 8].includes(Orientation)) {
      canvas.width = ctxHeight;
      canvas.height = ctxWidth;
    }

    switch (Orientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, ctxWidth, 0);
        break;
      case 3:
        ctx.transform(-1, 0, 0, -1, ctxWidth, ctxHeight);
        break;
      case 4:
        ctx.transform(1, 0, 0, -1, 0, ctxHeight);
        break;
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, ctxHeight, 0);
        break;
      case 7:
        ctx.transform(0, -1, -1, 0, ctxHeight, ctxWidth);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, ctxWidth);
        break;
      default:
        ctx.transform(1, 0, 0, 1, 0, 0);
    }

    ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
    
    // 默认输出jpeg,也可以读取原图片格式，最后输出原图格式，搜索关键词 ：File.type
    base64 = canvas.toDataURL('image/jpeg', quality); 
    callback(base64);
  });
};