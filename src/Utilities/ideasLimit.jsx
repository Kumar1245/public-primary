// // export const checkIdeaSubmissionLimit = ({ userIdeas = [], level }) => {
// //   if (!userIdeas.length || !level) {
// //     return { allowed: true };
// //   }

// //   const normalizedLevel = level.trim().toLowerCase();

// //   const levelLimitsInMonths = {
// //     county: 1,
// //     city: 1,
// //     state: 12,
// //     national: 24,
// //   };

// //   const monthsLimit = levelLimitsInMonths[normalizedLevel];
// //   if (!monthsLimit) return { allowed: true };

// //   const sortedIdeas = [...userIdeas].sort(
// //     (a, b) => new Date(b.submittedOn) - new Date(a.submittedOn),
// //   );

// //   console.log(sortedIdeas,"sortedIdeas")

// //   const lastIdea = sortedIdeas[0];
// //   if (!lastIdea?.submittedOn) return { allowed: true };

// //   const lastDate = new Date(lastIdea.submittedOn);
// //   const nextAllowedDate = new Date(lastDate);
// //   nextAllowedDate.setMonth(nextAllowedDate.getMonth() + monthsLimit);

// //   if (Date.now() < nextAllowedDate.getTime()) {
// //     return {
// //       allowed: false,
// //       nextAllowedDate,
// //     };
// //   }

// //   return { allowed: true };
// // };

// export const checkIdeaSubmissionLimit = ({ userIdeas = [], level }) => {
//   if (!userIdeas.length || !level) {
//     return { allowed: true };
//   }

//   const normalizedLevel = level.trim().toLowerCase();

//   const levelLimitsInMonths = {
//     county: 1,
//     city: 1,
//     state: 12,
//     national: 24,
//   };

//   const monthsLimit = levelLimitsInMonths[normalizedLevel];
//   if (!monthsLimit) return { allowed: true };

//   const sortedIdeas = [...userIdeas].sort(
//     (a, b) =>
//       new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime(),
//   );

//   const lastIdea = sortedIdeas[0];
//   if (!lastIdea?.submittedOn) return { allowed: true };

//   const lastDate = new Date(lastIdea.submittedOn);

//   // Safer month addition
//   const nextAllowedDate = new Date(
//     lastDate.getFullYear(),
//     lastDate.getMonth() + monthsLimit,
//     lastDate.getDate(),
//     lastDate.getHours(),
//     lastDate.getMinutes(),
//     lastDate.getSeconds(),
//   );

//   if (Date.now() < nextAllowedDate.getTime()) {
//     return {
//       allowed: false,
//       nextAllowedDate,
//     };
//   }

//   return { allowed: true };
// };

// ideasLimit.js

export const checkIdeaSubmissionLimit = ({
  userIdeas = [],
  level,
  now = Date.now(),
}) => {
  if (!userIdeas.length || !level) {
    return {
      allowed: true,
      remainingText: "",
      nextAllowedDate: null,
    };
  }

  // Normalize level safely
  const normalizedLevel = level.trim().toLowerCase();

  const levelLimitsInMonths = {
    county: 1,
    city: 1,
    state: 12,
    national: 24,
  };

  const monthsLimit = levelLimitsInMonths[normalizedLevel];

  if (!monthsLimit) {
    return {
      allowed: true,
      remainingText: "",
      nextAllowedDate: null,
    };
  }

  // Sort latest idea
  const sortedIdeas = [...userIdeas].sort(
    (a, b) => new Date(b.submittedOn) - new Date(a.submittedOn)
  );

  const lastIdea = sortedIdeas[0];

  if (!lastIdea?.submittedOn) {
    return {
      allowed: true,
      remainingText: "",
      nextAllowedDate: null,
    };
  }

  const lastDate = new Date(lastIdea.submittedOn);
  const nextAllowedDate = new Date(lastDate);
  nextAllowedDate.setMonth(
    nextAllowedDate.getMonth() + monthsLimit
  );

  const diff = nextAllowedDate.getTime() - now;

  if (diff <= 0) {
    return {
      allowed: true,
      remainingText: "",
      nextAllowedDate: null,
    };
  }

  // Convert to seconds
  const totalSeconds = Math.floor(diff / 1000);

  const years = Math.floor(totalSeconds / (86400 * 365));
  const months = Math.floor(
    (totalSeconds % (86400 * 365)) / (86400 * 30)
  );
  const days = Math.floor(
    (totalSeconds % (86400 * 30)) / 86400
  );
  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );
  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );
  const seconds = totalSeconds % 60;

  let remainingText = "";

  if (years > 0) {
    remainingText = `${years}y ${months}m`;
  } else if (months > 0) {
    remainingText = `${months}m ${days}d`;
  } else if (days > 0) {
    remainingText = `${days}d ${hours}h`;
  } else if (hours > 0) {
    remainingText = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    remainingText = `${minutes}m ${seconds}s`;
  } else {
    remainingText = `${seconds}s`;
  }

  return {
    allowed: false,
    remainingText,
    nextAllowedDate,
  };
};