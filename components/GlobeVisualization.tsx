
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GlobeVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    // The projection
    const projection = d3.geoOrthographic()
      .scale(250)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create the globe base
    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 250)
      .attr('fill', '#f0f9ff')
      .attr('stroke', '#1DA1F2')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glow)');

    // Add glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '10')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Generate random continents (simplified)
    const graticule = d3.geoGraticule();
    svg.append('path')
      .datum(graticule())
      .attr('class', 'graticule')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#1DA1F233')
      .attr('stroke-width', 0.5);

    // Mock "People" points
    const points = [
      { lat: 20, lon: 10, color: '#FF9900' },
      { lat: -30, lon: -40, color: '#1DA1F2' },
      { lat: 50, lon: 80, color: '#FF9900' },
      { lat: -10, lon: 120, color: '#1DA1F2' },
      { lat: 40, lon: -100, color: '#FF9900' },
    ];

    const pointGroup = svg.append('g');
    const lineGroup = svg.append('g');

    // Rotation animation
    d3.timer((elapsed) => {
      projection.rotate([elapsed * 0.01, -15]);
      svg.selectAll('.graticule').attr('d', path);
      
      pointGroup.selectAll('circle').remove();
      lineGroup.selectAll('path').remove();

      const visiblePoints = points.map(p => {
        const coords = projection([p.lon, p.lat]) as [number, number];
        const visible = d3.geoDistance([p.lon, p.lat], projection.invert!([width / 2, height / 2])) < Math.PI / 2;
        return { ...p, coords, visible };
      }).filter(p => p.visible);

      pointGroup.selectAll('circle')
        .data(visiblePoints)
        .enter()
        .append('circle')
        .attr('cx', d => d.coords[0])
        .attr('cy', d => d.coords[1])
        .attr('r', 6)
        .attr('fill', d => d.color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      // Connecting lines
      for (let i = 0; i < visiblePoints.length; i++) {
        for (let j = i + 1; j < visiblePoints.length; j++) {
          lineGroup.append('path')
            .attr('d', `M${visiblePoints[i].coords[0]},${visiblePoints[i].coords[1]} Q${width/2},${height/2} ${visiblePoints[j].coords[0]},${visiblePoints[j].coords[1]}`)
            .attr('stroke', i % 2 === 0 ? '#1DA1F266' : '#FF990066')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none')
            .attr('stroke-dasharray', '5,5');
        }
      }
    });

  }, []);

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      <svg ref={svgRef} className="max-w-full max-h-full drop-shadow-2xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] rounded-full border border-blue-100 opacity-20 animate-pulse" />
      </div>
    </div>
  );
};

export default GlobeVisualization;
