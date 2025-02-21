import "./Timeline.css";

interface TimelineItem {
  bullets: string[];
  description?: string;
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
 * @param props.id The ID of the timeline.
 */
function Timeline({ id, items }: { id: string; items: TimelineItem[] }) {
  return (
    <div className="timeline-container" id={`timeline-${id}`}>
      {items.map(item => (
        <div className="timeline-item" key={`${item.title}-${item.year}`}>
          <div className="timeline-card" id={`card-${item.year}`}>
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
                  <button className="tag" key={tag} type="button">
                    {tag}
                  </button>
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
