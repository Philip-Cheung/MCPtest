import PageTemplate from "../components/PageTemplate";
import { BuildingsTable } from "../components/BuildingsTable/index";

export default function Portfolio() {
  return (
    <PageTemplate showPlaceholders={false}>
      <BuildingsTable />
    </PageTemplate>
  );
}
