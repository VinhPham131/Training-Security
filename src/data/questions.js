const mc = (prompt, correct, wrong, meta = {}) => ({
  type: 'mcq',
  prompt,
  options: [correct, ...wrong],
  answer: correct,
  ...meta,
})

const fill = (prompt, answer, choices, meta = {}) => ({
  type: 'fill',
  prompt,
  choices: [...choices],
  answer,
  ...meta,
})

const match = (pairs, meta = {}) => ({
  type: 'match',
  prompt: 'Match the phrase with the meaning.',
  pairs,
  ...meta,
})

export const QUESTION_BANK = {
  greetings: [
    mc("Hi, I’m Tom. I have came to this hotel for the first time:", 'Good morning, sir', ['Hi, madam', 'Hi, boy']),
    mc('Can you help me?', 'Yes, how can I assist you, sir?', ['What?', 'Wait there.']),
    mc("I’m looking for the reception.", 'Please go straight and turn left.', ['Go.', 'It’s over there.']),
    mc('Is it far?', 'No, it’s quite near. Just a 2-minute walk.', ['No.', 'Not far, just go.']),
    mc('Do I need to check in there?', 'We will need to perform a quick security check.', ["I don’t know?", 'No!']),
    mc('Thank you for your help.', 'You’re welcome. Have a nice day!', ['Okay.', 'Hmm.']),
  ],
  'visitor-checkin': [
    mc('Guest asks: “What time is check-in?”', 'Check-in starts at 2 PM.', ['Check-in is never.', 'Check-in is yesterday.'], { tags: ['time'] }),
    mc('Which is correct for check-out time?', 'Check-out is at 12 PM (noon).', ['Check-out is at 25 PM.', 'Check-out is at 60 PM.'], { tags: ['time'] }),
    fill('“Please wait a _____ moment.”', 'little', ['little', 'broken', 'danger'], { tags: ['polite'] }),
    match(
      [
        { left: 'Could you wait here?', right: 'Bạn có thể đợi ở đây không?' },
        { left: 'The lobby is on the first floor.', right: 'Sảnh ở tầng một.' },
        { left: 'Thank you for your patience.', right: 'Cảm ơn bạn đã kiên nhẫn.' },
      ],
      { tags: ['meaning'] },
    ),
  ],
  emergency: [
    mc('Fire alarm is on. Best instruction?', 'Please evacuate calmly and follow the exit signs.', ['Please stay inside forever.', 'Ignore the alarm.'], { tags: ['emergency'], timed: true }),
    mc('A guest is injured. What do you say first?', 'Are you okay? I will call for help.', ['Stand up now.', 'This is not my job.'], { tags: ['emergency'], timed: true }),
    fill('“Please stay _____ from the area.”', 'away', ['away', 'inside', 'above'], { tags: ['emergency'], timed: true }),
    match(
      [
        { left: 'Call the emergency number.', right: 'Gọi số khẩn cấp.' },
        { left: 'Do not use the elevator.', right: 'Không sử dụng thang máy.' },
        { left: 'Follow me to the exit.', right: 'Theo tôi ra lối thoát hiểm.' },
      ],
      { tags: ['emergency'], timed: true },
    ),
  ],
}

export function getQuestionsForTopic(topicId) {
  const set = QUESTION_BANK[topicId] || []
  return set.slice(0, 6)
}

