function calcFactor(oldFac, quality) {
  return oldFac + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
}

export default function reviewAssigner(quality, lastSchedule, lastFactor) {
  let newFac
  let curSchedule

  if (!lastSchedule) {
    curSchedule = 1
    newFac = 2.5
  }
  if (lastSchedule === 1) {
    curSchedule = 6
    newFac = 2.5
  }
  if (!quality || quality > 5) {
    quality = 0
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
    isRepeatAgain: quality < 4.7
  }
}
