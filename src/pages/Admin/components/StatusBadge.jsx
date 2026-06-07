import Dropdown from "../../../components/ui/Dropdown";
import { STATUS_DROPDOWN_STYLES, STATUS_OPTIONS } from "../../../components/ui/Dropdown/styles";

export default function StatusBadge({ status, onChange }) {
  return (
    <Dropdown
      value={status}
      onChange={onChange}
      options={STATUS_OPTIONS}
      styles={STATUS_DROPDOWN_STYLES}
    />
  );
}
