import { useParams } from "react-router-dom";
import Room from "../components/Room";

export default function RoomPageWrapper() {
  const { id } = useParams();
  return <Room roomId={id} />;
}
