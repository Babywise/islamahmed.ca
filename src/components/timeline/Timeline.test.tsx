import { render } from "@testing-library/react";

import Timeline from "./Timeline";

const mockTimelineItems = [
  {
    bullets: ["Developed feature X", "Improved performance by 50%"],
    description: "Leading development of web applications",
    duration: "Jan 2023 - Present",
    location: "Toronto, ON",
    organization: "Tech Corp",
    tags: ["React", "TypeScript"],
    title: "Software Engineer",
    year: "2023"
  },
  {
    bullets: ["Implemented feature Y"],
    description: "Full-stack development",
    duration: "Jan - Dec 2022",
    location: "Vancouver, BC",
    organization: "Startup Inc",
    title: "Junior Developer",
    year: "2022"
  }
];

describe("timeline", () => {
  test("should render successfully", () => {
    expect.assertions(1);

    const { container } = render(
      <Timeline id="test" items={mockTimelineItems} />
    );
    const timeline = container.querySelector(".timeline-container");

    expect(timeline).toBeInTheDocument();
  });

  test("should render all timeline items", () => {
    expect.assertions(3);

    const { container } = render(
      <Timeline id="test" items={mockTimelineItems} />
    );
    const timelineItems = container.querySelectorAll(".timeline-item");
    const firstItemTitle = container.querySelector("h3");
    const [, secondItemTitle] = container.querySelectorAll("h3");

    expect(timelineItems).toHaveLength(2);
    expect(firstItemTitle?.textContent).toBe(mockTimelineItems[0].title);
    expect(secondItemTitle?.textContent).toBe(mockTimelineItems[1].title);
  });

  test("should render timeline item with all properties", () => {
    expect.assertions(7);

    const { container } = render(
      <Timeline id="test" items={[mockTimelineItems[0]]} />
    );

    // Check if all properties of the first item are rendered
    const yearElement = container.querySelector("#year-2023");
    const durationElement = container.querySelector(".duration");
    const titleElement = container.querySelector("h3");
    const organizationElement = container.querySelector(".organization");
    const descriptionElement = container.querySelector("p");
    const bulletElement = container.querySelector(".bullet-points li");
    const tagElement = container.querySelector(".tag");

    expect(yearElement?.textContent).toBe(mockTimelineItems[0].year);
    expect(durationElement?.textContent).toBe(mockTimelineItems[0].duration);
    expect(titleElement?.textContent).toBe(mockTimelineItems[0].title);
    expect(organizationElement?.textContent).toBe(
      `${mockTimelineItems[0].organization} • ${mockTimelineItems[0].location}`
    );
    expect(descriptionElement?.textContent).toBe(
      mockTimelineItems[0].description
    );
    expect(bulletElement?.textContent).toBe(mockTimelineItems[0].bullets[0]);
    expect(tagElement?.textContent).toBe(mockTimelineItems[0].tags?.[0]);
  });

  test("should render timeline item without tags when not provided", () => {
    expect.assertions(2);

    const { container } = render(
      <Timeline id="test" items={mockTimelineItems} />
    );

    // Second item doesn't have tags
    const [, secondItem] = container.querySelectorAll(".timeline-item");
    const tags = secondItem?.querySelector(".tags");

    expect(secondItem).toBeInTheDocument();
    expect(tags).not.toBeInTheDocument();
  });

  test("should render empty timeline when no items provided", () => {
    expect.assertions(1);

    const { container } = render(<Timeline id="test" items={[]} />);
    const timelineItems = container.querySelectorAll(".timeline-item");

    expect(timelineItems).toHaveLength(0);
  });

  test("should apply the correct ID to the timeline container", () => {
    expect.assertions(1);

    const { container } = render(
      <Timeline id="work" items={mockTimelineItems} />
    );
    const timeline = container.querySelector("#timeline-work");

    expect(timeline).toBeInTheDocument();
  });
});
