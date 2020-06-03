export function solutionFromFeeling(feeling) {
    const autocorrectedFeeling = feeling.toLowerCase(); // need to actually autocorrect here
    switch (autocorrectedFeeling) {
        case 'sad': return {
            feeling: 'sad',
            message: "Feeling this way is ok!",
            bodyLanguage:
                "adjust posture to be open, welcoming. shoulders wide, legs wide, straighten back.",
            oppositeAction: "feel grateful.",
            breathing: "10 deep breaths"
        }
        default: return {};
    }
}