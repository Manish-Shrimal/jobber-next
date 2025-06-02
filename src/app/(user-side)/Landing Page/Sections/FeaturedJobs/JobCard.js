import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

const JobCard = ({
  title,
  min_salary,
  max_salary,
  min_exp,
  created,
  logo,
  company_name,
  work_type,
  job_city,
  slug,
  cat_slug,
  desc,
  curr,
}) => {
  return (
    <div className="job-card">
      <div className="job-footer">
        <div className="company-logo">
          <Image width={100} height={100} unoptimized={true} src={logo} alt="Company Logo" className="logo" />
        </div>
        <div className="company-location">
          <div className="company-name">{company_name}</div>

          <div className="location">
            <FaMapMarkerAlt />
            {job_city.substring(0, 25)}
          </div>
        </div>
      </div>
      <div className="job-header">
        <Link href={`/jobdescription/${slug}/${cat_slug}`}>
          <div className="job-title">{title}</div>
        </Link>
      </div>

      <div className="job-experience-type">
        <div className="job-experience">Experience: {min_exp} years</div>
        <div className="job-type">{work_type}</div>
      </div>

      <div className="job-description">
        {desc && HTMLReactParser(desc.slice(0, 200))}
      </div>
      <div className="job-salary-duration">
        <div className="job-salary">
          {curr}
          {min_salary} - {curr}
          {max_salary}/Year
        </div>
        <div className="job-time">
          <SlCalender /> {created} Days Ago
        </div>
      </div>
    </div>
  );
};
export default JobCard;
