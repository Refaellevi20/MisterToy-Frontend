import { useEffect, useState } from 'react'

export function CountdownTimer({ timeLeft }) {
    const [timeRemaining, setTimeRemaining] = useState(timeLeft)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1000) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1000
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
    const seconds = Math.floor((timeRemaining / 1000) % 60)

    return (
        <div>
            {timeRemaining > 0 ? (
                <p>Time left: {hours}h {minutes}m {seconds}s</p>
            ) : (
                <p>Discount expired</p>
            )}
        </div>
    )
}
