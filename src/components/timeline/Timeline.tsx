import "./Timeline.css";

interface TimelineItem {
  bullets: string[];
  description: string;
  duration: string;
  location: string;
  organization: string;
  tags?: string[];
  title: string;
  year: string;
}

/**
 * Timeline component.
 * @param props The component props object.
 * @param props.items An array of timeline items.
 */
function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline-container">
      {items.map(item => (
        <div className="timeline-item" key={item.title}>
          <div className="timeline-card">
            <div className="year-section">
              <span className="year" id={`year-${item.year}`}>
                {item.year}
              </span>
              <span className="duration">{item.duration}</span>
            </div>

            <h3>{item.title}</h3>
            <div className="organization">
              {item.organization} • {item.location}
            </div>

            <p>{item.description}</p>

            <div className="bullet-points">
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </div>

            {item.tags ? (
              <div className="tags">
                {item.tags.map(tag => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
