import {useState, useEffect} from 'react'

interface UseCarouselProps {
    totalNumber: number;
    interval?: number;
}

export const useCarousel = ({
    totalNumber, interval = 5000
}: UseCarouselProps) => {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % totalNumber)
        }, interval)

        return () => clearInterval(timer)
    }, [totalNumber, interval])

    return currentImage
}