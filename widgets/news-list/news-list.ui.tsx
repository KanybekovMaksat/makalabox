import { Button, Card, CardMedia } from '@mui/material';

export function NewsList() {
  return (
      <div className="flex flex-col md:flex-row md:justify-between gap-5">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
  );
}

function NewsCard() {
  return (
    <Card className="w-full md:w-[320px] border-sc-100 p-3 shadow-none">
      <CardMedia
        className="h-[190px] rounded"
        image="https://i.pinimg.com/564x/e2/ef/21/e2ef21f4ef052d2d559371c478100343.jpg"
        title="green iguana"
      />
      <h3 className="text-lg font-bold my-3 text-pc-500">
        The Impact of Technology on the Workplace: How Technology is Changing
      </h3>
      <Button variant="outlined" className="border-pc-200 text-pc-300 w-full">
        Читать
      </Button>
    </Card>
  );
}
