const dayjs = require('dayjs');
const canv = require('canvas');
const fs = require('fs');

/**
 * Returns the first day of week. (SUN ~ SAT: 0 ~ 6)
 *
 * @returns {number}
 */
const getFirstDayOfWeek = () => dayjs().date(1).day();

const getNumOfWeeks = (year, month) => {

}

const drawBackground = (ctx, w, h) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
}

const drawTitle = (ctx, w, fontSize, text) => {
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.font = `bold ${fontSize}px NanumGothic`;
  ctx.fillText(text, w / 2, fontSize);
}

const dayOfWeeks = ['일', '월', '화', '수', '목', '금', '토'];

const drawHeader = (ctx, w, fontSize, titleFontSize) => {
  const cellWidth = w / dayOfWeeks.length;
  const y = titleFontSize + titleFontSize / 3;

  dayOfWeeks.reduce((acc, cur, i) => {
    // Draws border.
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#000';
    ctx.rect(acc, y, cellWidth, fontSize * 1.5);
    ctx.stroke();

    // Fills in a header cell.
    ctx.fillStyle = i === 0 || i === dayOfWeeks.length - 1 ? '#B3C6E7' : '#203761';
    ctx.fill();

    // Draws header name.
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px NanumGothic`;
    ctx.fillText(cur, acc + (cellWidth / 2), y + fontSize);

    return acc + cellWidth;
  }, 0);
}

const drawDates = (ctx, w, fontSize, titleFontSize) => {
  // Calculates dates of current month.
  const dates = [];
  for (let i = 1, date = dayjs().date(i); i <= date.daysInMonth(); i++, date = date.date(i)) {
    const day = {
      year: date.year(),
      month: date.month() + 1,
      dateOfMonth: date.date(),
      dayOfWeek: date.day(),
      isWeekend() {
        return this.dayOfWeek === 0 || this.dayOfWeek === 6;
      },
    };

    dates.push(day);
  }

  // const context = canvas.getContext('2d');
  const cellWidth = w / dayOfWeeks.length;
  const h = titleFontSize * 1.33 + (fontSize * 1.5);

  for (let cnt = 0, y = h; cnt < dayOfWeeks.length; cnt++, y += h - 0.5) {
    console.log('y', y);
    dayOfWeeks.reduce((acc, cur, i) => {
      // Draws border.
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#000';
      ctx.rect(acc, y, cellWidth, fontSize * 3);
      ctx.stroke();

      // Fills in a header cell.
      ctx.fillStyle = i === 0 || i === dayOfWeeks.length - 1 ? '#D8D9DB' : '#FFF';
      ctx.fill();

      return acc + cellWidth;
    }, 0);
  }
}

const write = (canvas, path) => fs.writeFileSync(path, canvas.toBuffer('image/png'));

exports.generate = async (width, height) => {
  const canvas = canv.createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Paints background with white.
  drawBackground(context, width, height);

  // Draws the title.
  const titleFontSize = width * 0.033;
  drawTitle(context, width, titleFontSize, `${dayjs().year()}년 ${dayjs().month() + 1}월 릴레이 순서`);

  // Draws the header.
  const fontSize = width * 0.027;
  drawHeader(context, width, fontSize, titleFontSize);

  // Draws dates.
  drawDates(context, width, fontSize, titleFontSize);

  // Creates a image.
  write(canvas, './image.png');

  // const image = await canv.loadImage('./sample.jpg');
  // context.drawImage(image, 0, 0, 550, 340);
  console.log('dataURL: ', canvas.toDataURL());
}
