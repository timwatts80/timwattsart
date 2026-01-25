'use client';

import { useState, useEffect, useRef } from 'react';

export default function ScrollDrawnLine() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [docHeight, setDocHeight] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);
    const docHeightRef = useRef(0);
    const pathLengthRef = useRef(0);
    const highlightSplitRef = useRef(0.5);
    const pathwaySplitRef = useRef(0.8);

    // SVG path from Asset 2.svg - long flowing line spanning the document (desktop)
    const pathDDesktop = "M1710.05.01c-3.17,267.91-.07,535.9,9.31,803.67-79.12,2.95-158.55-2.52-236.51-16.29-10.73,84.14-33.72,166.71-68,244.29,38.28-16.82,76.55-33.65,114.83-50.47-36.08-28.74-72.16-57.48-108.24-86.22,63.82,169.87,96.32,351.44,95.39,532.9-40.72-41.73-86.9-78.13-136.98-107.99,158.89,54.15,317.78,108.3,476.67,162.46-.3-58.85-.61-117.71-.91-176.56-60.43,87.51-150.67,154.04-252.15,185.86,58.84,201.01,117.69,402.03,176.53,603.04,5.48,18.71,11,37.8,10.42,57.28-.61,20.34-7.83,39.83-14.96,58.89-25.57,68.31-51.15,136.62-76.72,204.93-197.57.79-395.13,1.58-592.7,2.37-20.68.08-42.09.32-60.88,8.94-23.09,10.59-38.86,32.19-53.57,52.9-28.98,40.8-57.97,81.6-86.95,122.4,94.63-65.85,184.49-138.56,268.62-217.39-122.48-14.88-246.96-13.22-369,4.92,66.14,82.76,132.28,165.52,198.42,248.29-79.1,62.05-173.55,104.37-272.51,122.12,55.92,240.28,113.61,479.67,173.44,719.06-64.55-8.91-129.11-17.82-193.66-26.73,70.21,53.71,140.42,107.42,210.63,161.12,6.83,5.23,14.61,10.74,23.16,9.79,8.18-.9,14.44-7.45,19.93-13.58,61.99-69.22,123.97-138.44,185.96-207.66,7.45-8.32,15.42-19.52,10.73-29.66-3.54-7.66-12.69-10.63-20.88-12.67-66.11-16.53-134.18-25.23-202.32-25.87,125.66,215.41,276.59,416.08,448.69,596.57-83.03,38.89-171.49,66.19-261.99,80.86,206.27,9.33,412.53,18.67,618.8,28,25.63,1.16,55.19,4.44,69.29,25.87,10.24,15.56,8.7,35.78,6.73,54.3-19.28,181.62-42.77,367.45-.11,545.05,164.29-28.84,328.58-57.68,492.86-86.51,8.67-1.52,17.83-3.01,26.08.06,21.42,7.97,21.66,37.69,18.63,60.34-20.07,149.85-12.5,303.36,22.21,450.51-117.64-76.27-276.7-31.11-409.59-75.81,62-46.34,133.7-79.62,209.11-97.05-15.79,76.12-41.72,150.12-76.91,219.44-47.25-1.66-65.8-60.22-95.59-96.94-54.26-66.86-154.75-63.01-240.83-64.92-114.95-2.55-229.4-26.2-335.94-69.44-6.56,49.41-13.12,98.83-19.68,148.24-62.74-6.08-124.6-21.25-183.03-44.89,5.16,46.79-3.24,95-23.91,137.3,37.28-21.29,72.7-45.84,105.72-73.28-53.61-15.24-109.3-23.13-165.03-23.37-16.95,45.16-38.25,88.69-63.52,129.78-6.35,10.33-13.41,20.94-24.13,26.61-12.12,6.43-26.68,5.39-40.35,4.2-55.06-4.83-110.13-9.65-165.19-14.48,38.04,78.4,82.1,153.87,131.68,225.53-9.96-51.4-17.19-103.32-21.64-155.48-15.35,54.46-26.38,112.31-47.56,164.43-22.43,55.2-45.82,110.01-70.14,164.4-48.63,108.79-100.98,215.92-156.93,321.13,197.39,43.62,395.91,82.17,595.28,115.6-127.54,296.24-250.45,594.48-368.68,894.56-31.61-66.62-67.97-130.99-108.71-192.45,128.97,70.03,249.54,155.51,358.31,254.03,3.42-71.29,6.83-142.59,10.25-213.88-70.35,39.17-138.5,82.31-204,129.15,418.34-30.03,837.97-42.16,1257.35-36.36,12.49.17,28.46,3.08,30.87,15.33,1.83,9.28-5.87,17.49-13.08,23.61-45.97,39.05-99.66,68.97-157.04,87.53,88.26-20.84,173.8-53.15,253.79-95.86,4.68,55.22,9.37,110.44,14.05,165.65,44.13-46.93,84.25-97.62,119.78-151.36,74.22,53.01,138.15,120.36,187.24,197.22-195.42,168.91-374.37,356.86-533.51,560.33-31.67,40.49-49.07,82.86-73.4,128.14,66.83,20.5,132.25,45.61,195.63,75.08-10.12-40.27-13.4-82.25-9.64-123.61-33.5,56.63-67,113.25-100.5,169.88,191.2,18.88,384.55,15.87,575.07-8.95,6.12-.8,12.82-1.5,18.05,1.79,7.23,4.56,8.36,14.46,8.74,23.01,8.23,184.79,16.45,369.58,24.68,554.37-56.85,36.39-113.69,72.77-170.54,109.16.65-66.37,10.32-132.64,28.68-196.42,42.3,89.48,87.07,182.17,164.27,244.11-62.47,19.49-125.05,39.01-185.42,64.25-90.29,37.74-174.85,87.9-263.8,128.69-82.71,37.93-169.16,67.7-257.68,88.75,51.69,59.75,103.38,119.5,155.06,179.25,99.24,114.72,122.42,277.08,208.11,402.25-54-34.42-116.95-54.66-180.89-58.15,138.04-6.31,276.09-12.63,414.13-18.94-6.59,289.39-22.9,578.57-48.9,866.87-95.26-4.9-191.02-.1-285.31,14.29,52.32-32.71,104.64-65.42,156.96-98.13-2.89,64.9-12.06,129.52-27.36,192.66-160.79-49.66-333.52-40.31-499.13-70.21-153.66-27.74-302.53-89.44-458.67-89.43-7.89,0-16.02.21-23.28,3.3-9.12,3.89-15.78,11.83-22.07,19.49-49.87,60.73-99.73,121.45-149.6,182.18,82.85-13.39,165.69-26.79,248.54-40.18-52.77-37.42-105.53-74.84-158.3-112.26-4.75-3.37-9.75-6.84-15.52-7.63-7.51-1.03-14.78,2.66-21.47,6.22-197.59,105.11-400.16,200.85-606.81,286.8-175.05,72.81-334.74,174.26-500.14,266.92-91.19,51.08-182.74,102.4-265.57,166.16";

    // SVG path from Asset 3.svg - mobile line
    const pathDMobile = "M508.49.01c-2.77,113.14,3.01,226.49,17.26,338.76-22.18,1.44-44.36,2.88-66.54,4.33,10.54,31.74,15.67,65.27,15.12,98.71,14.81-4.32,28.84-11.28,41.24-20.47-17.4-19.48-38.65-35.51-62.16-46.88,19.62,129.06,39.24,258.11,58.86,387.17-164.82.7-329.67-4.81-494.07-16.53C-3.27,916.03.62,1090.12,29.7,1259.92c20.26-15.71,47.07-22.7,72.42-18.87-19.05-15.77-40.07-29.16-62.41-39.76,17.87,32.25,32.75,66.16,44.37,101.16,79.42-46.76,173.19-61.08,264.38-74.52,10.69-1.57,22.1-3.05,31.89,1.52,8.23,3.85,14.02,11.41,19.34,18.78,38.19,52.86,69.98,110.34,94.47,170.79-154.65,48.26-306.77,104.6-455.55,168.71-9.62,179.05-21.75,359.46-22.62,538.76-.03,5.96.05,12.3,3.31,17.3,3.01,4.62,8.21,7.25,13.16,9.68,59.32,29.02,118.63,58.05,177.95,87.07-1.62-40.42,2.97-81.08,13.56-120.12,19.08,42.24,43.57,82.04,72.68,118.11-48.97-20.4-97.94-40.8-146.91-61.2,95.41-16.76,188.62-46.05,276.48-86.87,26.82,161.82,57.2,323.06,91.09,483.55-79.53-6.7-158.6-18.9-236.45-36.49-7.31,49.51-6.45,100.22,2.53,149.46,16.15-28.54,32.29-57.08,48.44-85.62-85.97,40.81-169.24,87.31-249.07,139.1,36.46,89.36,62.12,183.12,76.27,278.59-9.82-71.31-13.39-143.49-10.65-215.42-6.7,67.1-13.4,134.2-20.1,201.31-1.8,18.06-3.49,36.98,3.44,53.76,6.05,14.64,17.97,25.91,29.56,36.71,45.65,42.55,91.3,85.1,136.95,127.66-17.12,17.59-34.24,35.18-51.36,52.76-2.65,79.01-10.88,159.46-13.52,238.47-.27,8.06-.36,16.75,4.25,23.36,5.11,7.32,14.51,10.02,23.18,12.17,65.93,16.34,132.62,29.65,199.78,39.87-1.35,59.21-2.7,118.42-4.05,177.63-.14,6.25-.5,13.07-4.65,17.74-3.62,4.08-9.28,5.53-14.6,6.75-97.63,22.46-197.2,36.51-297.24,41.94-9.05.49-18.81,1.18-25.76,6.99-5.56,4.65-8.29,11.76-10.77,18.57-26.23,72.1-47.88,145.87-64.78,220.71,44.32-6.69,88.63-13.37,132.95-20.06-11.65,82.48-19.24,165.52-22.73,248.75-17.65-11.09-35.3-22.17-52.96-33.26,32.21,3.27,64.88,1.98,96.74-3.83-9.28,43.35-18.56,86.7-27.84,130.05,40.4.8,80.86-1.7,120.85-7.46,8.84,44.58,15.66,89.55,20.45,134.75,40.02-10.4,81.2-16.32,122.53-17.59-18.95-38.18-37.9-76.36-56.85-114.54-29.81,140.25-55.69,281.34-77.59,423.05-7.92,51.28-31.21,111.62-44.46,161.78-1.42,5.37-2.58,11.83,1.24,15.85,3.05,3.22,8.03,3.42,12.46,3.4,82.71-.55,165.38-8.05,246.84-22.41,11.98,79.52,19.45,159.72,22.38,240.09-25.89,3.18-51.33,9.98-75.35,20.13,6.69-15.27,13.37-30.54,20.06-45.81,11.71,17.69,23.42,35.37,35.13,53.06,9.62,14.52,19.39,29.4,23.71,46.27,3.58,13.99,3.21,28.65,2.82,43.09-3.58,132.33-7.16,264.67-10.74,397-.16,5.98-.64,12.68-5.12,16.64-3.11,2.75-7.45,3.51-11.55,4.15-144.4,22.43-291.12,29.84-437.04,22.08-6.92,85.14-13.85,170.28-20.77,255.42,42.17,12.1,84.35,24.21,126.52,36.31-7.35-35.63-14.7-71.25-22.05-106.88-10.96,50.02-16.32,101.27-15.95,152.48,53.53-10.57,109.31-9.58,162.42,2.89,10.17,2.39,20.74,5.2,30.91,2.82,7.51-1.76,14.07-6.2,20.4-10.62,37.31-26.09,72.98-54.52,106.74-85.06,4.57,35.15,9.14,70.29,13.7,105.44-39.94-33.12-82.97-62.52-128.34-87.7,44.78,8.57,89.55,17.14,134.33,25.71,7.16,1.37,14.88,3.05,19.7,8.52,4.28,4.86,5.33,11.67,6.21,18.08,10.24,74.61,20.48,149.22,30.73,223.83,14.81,107.9-6.74,214.11-11.48,322.92-.33,7.6-.93,15.87-6.04,21.49-5.47,6.02-14.37,7.13-22.48,7.86-35.06,3.16-70.12,6.33-105.18,9.49-7.4.67-15.23,1.49-21.17,5.97-18.79,14.15-2.6,48.06-17.88,65.94,33.53-28.75,61.91-63.5,83.38-102.11,63.54,132.14,91.89,280.99,81.38,427.24-46.27,16.81-92.54,33.62-138.81,50.42-16.63-28.77-38.1-54.74-63.24-76.48-3.18,23.45-9.35,46.5-18.3,68.41,34.06-12.79,66.85-28.97,97.72-48.23,22.7,22.98,42.67,48.65,59.36,76.3-19.72,10.5-39.44,21.01-59.15,31.51,42.96,2.63,86.13,1.79,128.96-2.53-5.26,114.49-.54,229.44,14.09,343.11-65.54-17.83-129.55-41.27-191.1-70-26.88,38.5-50.24,79.46-69.69,122.2,51.34-25.72,106.31-44.17,162.78-54.63-2.37-28.79-17.03-56.36-39.57-74.42-72.43,52.34-159.54,79.46-239.77,118.82-57.97,28.44-112.62,63.59-162.67,104.38";

    // Track scroll progress and document height
    useEffect(() => {
        const measureDocHeight = () => {
            const { body, documentElement: html } = document;
            if (!body || !html) return 0;

            return Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
            );
        };

        const updateSplitPoints = () => {
            const scrollableHeight = Math.max(docHeightRef.current - window.innerHeight, 0);

            const getSplit = (id: string, fallback: number) => {
                const el = document.getElementById(id);
                if (!el || scrollableHeight === 0) return fallback;
                const rect = el.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                return Math.min(Math.max(top / scrollableHeight, 0), 1);
            };

            highlightSplitRef.current = getSplit('highlight-artwork-2', 0.5);
            pathwaySplitRef.current = getSplit('pathway', 0.8);
        };

        const updateDocHeight = () => {
            const height = measureDocHeight();
            docHeightRef.current = height;
            setDocHeight(height);
            updateSplitPoints();
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollableHeight = Math.max(docHeightRef.current - window.innerHeight, 0);
            // Extend draw range so line finishes drawing early and stays visible through end of scroll
            const progress = scrollableHeight > 0 ? scrollTop / (scrollableHeight * DESKTOP_SCROLL_MULTIPLIER) : 0;
            setScrollProgress(progress);

            // Update SVG dashoffset immediately for zero-lag animation
            if (pathRef.current && pathLengthRef.current > 0) {
                const clampedProgress = Math.min(progress, 1); // Keep dashoffset at 0 once fully drawn
                const offset = pathLengthRef.current * (1 - clampedProgress);
                pathRef.current.style.strokeDashoffset = `${offset}`;
            }
        };

        updateDocHeight();

        const resizeObserver = new ResizeObserver(() => updateDocHeight());
        if (document.documentElement) resizeObserver.observe(document.documentElement);
        if (document.body) resizeObserver.observe(document.body);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateDocHeight);
        window.addEventListener('load', updateDocHeight);
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateDocHeight);
            window.removeEventListener('load', updateDocHeight);
            resizeObserver.disconnect();
        };
    }, []);

    // Update stroke-dashoffset based on scroll progress
    useEffect(() => {
        if (!pathRef.current) return;

        const path = pathRef.current;
        const pathLength = path.getTotalLength();
        pathLengthRef.current = pathLength;

        // Set the dash array to the path length
        path.style.strokeDasharray = `${pathLength}`;
        
        // Animate dashoffset based on scroll
        const offset = pathLength * (1 - scrollProgress);
        path.style.strokeDashoffset = `${offset}`;
    }, [scrollProgress]);

    const DESKTOP_HEIGHT_RATIO = 0.93; // 93% of parent height
    const MOBILE_HEIGHT_RATIO = 0.84; // 84% of parent height
    const DESKTOP_SCROLL_MULTIPLIER = 0.92; // Desktop line completes at 92% of scroll
    const MOBILE_SCROLL_MULTIPLIER_FAST = 1.2; // Mobile first-half draws faster
    const MOBILE_SCROLL_MULTIPLIER_SLOW = 3.2; // Mobile second-half draws slower
    const renderHeight = docHeight || 1000; // Fallback so it's visible before first effect
    
    // Desktop (Asset 2) dimensions
    const desktopSvgHeight = renderHeight * DESKTOP_HEIGHT_RATIO;
    const desktopSvgWidth = (desktopSvgHeight * 2790.44) / 11018.39;

    // Mobile (Asset 3) dimensions
    const mobileSvgHeight = renderHeight * MOBILE_HEIGHT_RATIO;
    const mobileSvgWidth = (mobileSvgHeight * 544.8) / 7664.49;
    
    // Calculate mobile-specific scroll progress with three segments:
    // fast until highlight-artwork-2, slow until pathway, then fast again
    const mobileScrollProgress = (() => {
        const p = Math.min(scrollProgress, 1);
        const splitHighlight = Math.min(Math.max(highlightSplitRef.current || 0.5, 0.05), 0.95);
        const rawPathway = Math.min(Math.max(pathwaySplitRef.current || 0.8, 0.05), 0.95);
        const splitPathway = Math.max(rawPathway, splitHighlight + 0.02); // ensure ordering

        const gainFast = DESKTOP_SCROLL_MULTIPLIER / MOBILE_SCROLL_MULTIPLIER_FAST;
        const gainSlow = DESKTOP_SCROLL_MULTIPLIER / MOBILE_SCROLL_MULTIPLIER_SLOW;

        if (p <= splitHighlight) {
            return Math.min(p * gainFast, 1);
        }

        const firstProgress = splitHighlight * gainFast;

        if (p <= splitPathway) {
            const inSlow = p - splitHighlight;
            return Math.min(firstProgress + inSlow * gainSlow, 1);
        }

        const secondProgress = (splitPathway - splitHighlight) * gainSlow;
        const inFastTail = p - splitPathway;
        return Math.min(firstProgress + secondProgress + inFastTail * gainFast, 1);
    })();

    return (
        <>
            {/* Desktop SVG - Asset 2 */}
            <div
                className="hidden lg:flex justify-center items-start"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${renderHeight}px`,
                    pointerEvents: 'none',
                    zIndex: 40,
                    paddingRight: '20%'
                }}
            >
                <svg
                    viewBox="0 0 2790.44 11018.39"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                        position: 'absolute',
                        height: `${desktopSvgHeight}px`,
                        width: `${desktopSvgWidth}px`,
                    }}
                >
                    <path
                        ref={pathRef}
                        d={pathDDesktop}
                        fill="none"
                        stroke="#808080"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Mobile SVG - Asset 3 */}
            <div
                className="block lg:hidden"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${renderHeight}px`,
                    pointerEvents: 'none',
                    zIndex: 40,
                }}
            >
                <svg
                    viewBox="0 0 544.8 7664.49"
                    preserveAspectRatio="xMidYMin meet"
                    style={{
                        position: 'absolute',
                        height: `${mobileSvgHeight}px`,
                        width: `${mobileSvgWidth}px`,
                    
                    }}
                >
                    <path
                        d={pathDMobile}
                        fill="none"
                        stroke="#808080"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: pathLengthRef.current,
                            strokeDashoffset: pathLengthRef.current * (1 - mobileScrollProgress),
                        }}
                    />
                </svg>
            </div>
        </>
    );
}
