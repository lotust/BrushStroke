const fs = require('fs')

const findWord = quality => {
  fs.readFile('script/dictionaryHSK1.json', (err, data) => {
    if (err) throw err
    const dictionaryHSK1 = JSON.parse(data)
    const qualityArr = dictionaryHSK1.filter(
      o => !o.quality || o.quality === quality
    )
    return qualityArr[Math.floor(Math.random() * qualityArr.length)]
  })
}

function calcFactor(oldFac, quality) {
  return oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
}

export default function(quality, lastSchedule, lastFactor) {
  let newFac
  let curSchedule

  if (!quality || quality > 5) {
    quality = 0
  }

  if (lastSchedule === 1) {
    curSchedule = 6
    newFac = 2.5
  }
  if (!lastSchedule) {
    curSchedule = 1
    newFac = 2.5
  }
  if (quality < 3) {
    curSchedule = lastSchedule
    newFac = lastFactor
  } else {
    newFac = calcFactor(lastFactor, quality)
    if (newFac < 1.3) {
      newFac = 1.3
    }
    curSchedule = Math.round(lastSchedule * newFac)
  }

  return {
    factor: newFac,
    schedule: curSchedule,
    isRepeatAgain: quality < 4
  }
}
