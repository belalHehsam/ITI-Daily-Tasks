import Card from "../card/card";
export default function CardList({ data }) {
  return (
    <>
      <div className="cards-grid">
        {data.map((news) => (
          <Card key={news.id} news={news} />
        ))}
      </div>
    </>
  );
}
