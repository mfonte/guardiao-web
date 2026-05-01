import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { config } from '@core/config';
import { useThemeStore } from '@shared/hooks/useThemeStore';

export function DashboardPage() {
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h3" component="h1" sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
            {config.appName}
          </Typography>
          <Tooltip title={`Trocar para tema ${mode === 'light' ? 'escuro' : 'claro'}`}>
            <IconButton color="inherit" onClick={toggleMode} aria-label="Alternar tema">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h2" component="h2">
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bem-vindo ao Guardião IoT.
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Ambiente: <strong>{config.env}</strong> · Projeto Firebase:{' '}
            <code>{config.firebase.projectId}</code>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
