import { Theme, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const statusData = {
  draft: { value: 'draft', title: 'Черновик', color: '#f6a914' },
  pending: { value: 'pending', title: 'Проверка', color: '#3e9dd8' },
  rejected: { value: 'rejected', title: 'Отклонено', color: '#ea4f44' },
  approved: { value: 'approved', title: 'Публиковано', color: '#2a9d99' },
};

function getStyles(color: string, theme: Theme) {
  return {
    backgroundColor: color,
    fontWeight: theme.typography.fontWeightMedium,
  };
}

interface StatusMenuProps {
  initialStatus: string;
}

export function StatusMenu({ initialStatus }: StatusMenuProps) {
  const theme = useTheme();
  return (
    <div>
      <Chip
        size="small"
        className="rounded text-[white] cursor-default"
        label={statusData[initialStatus].title}
        style={getStyles(statusData[initialStatus].color, theme)}
      />
    </div>
  );
}
