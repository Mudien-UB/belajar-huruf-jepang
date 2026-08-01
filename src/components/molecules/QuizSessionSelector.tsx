"use client";

interface SessionSelectorProps {
    currentSessionCount: number | null;
    onSessionCountChange: (count: number) => void;
}

export const QuizSessionSelector = ({ currentSessionCount, onSessionCountChange }: SessionSelectorProps) => {
    const options = [3, 5, 7];
    return (
        <div className="flex gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onSessionCountChange(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        currentSessionCount === option
                            ? 'bg-sakura text-paper border-navy'
                            : 'bg-paper text-navy border-muted-gold hover:bg-sakura hover:text-paper'
                    }`}
                >
                    {option} Sesi
                </button>
            ))}
        </div>
    );
};
