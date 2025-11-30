import { ButtonGroup, Button } from '@mui/material';

enum ArticleStatus {
  Draft = 'draft',
  Published = 'pending',
}

type ArticleStatusProps = {
  status: string;
  handleStatusChange: (newStatus: ArticleStatus) => void;
};

export function StatusSelect({
  status,
  handleStatusChange,
}: ArticleStatusProps) {
  return (
    <ButtonGroup
      variant="outlined"
      aria-label="Basic button group"
      size="small"
      className="my-4  "
    >
      {Object.values(ArticleStatus).map((statusOption) => (
        <Button
          key={statusOption}
          onClick={() => handleStatusChange(statusOption)}
          variant={status === statusOption ? 'contained' : 'outlined'}
          className={`shadow-none ${
            status === statusOption ? 'bg-second-100' : 'none'
          }`}
        >
          {statusOption === ArticleStatus.Draft ? 'Черновик' : 'Публиковать'}
        </Button>
      ))}
    </ButtonGroup>
  );
}
