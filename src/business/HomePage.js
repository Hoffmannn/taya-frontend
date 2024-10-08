import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { calculateAge } from "../utils/dateUtils";
import { actions } from "../reducers/home.actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  const handleDeleteUser = (values) => {
    dispatch(actions.deleteUser.request(values));
  };

  if (loading) {
    return <div>Carregando usuários</div>;
  }

  return (
    <Paper>
      <Typography variant="h4" textAlign="center">
        Usuários
      </Typography>
      <Button
        variant="contained"
        onClick={() => dispatch(routeActions.redirectTo(routes.CREATE))}
      >
        Criar Usuário
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="header">Nome</TableCell>
            <TableCell variant="header">Idade</TableCell>
            <TableCell variant="header">Cidade/UF</TableCell>
            <TableCell variant="header">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((user) => {
            return (
              <TableRow key={user.id} variant="data">
                <TableCell>{user.name}</TableCell>
                <TableCell>{calculateAge(user.birthDate)}</TableCell>
                <TableCell>
                  {user.city}/{user.state}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Edit
                      onClick={() =>
                        dispatch(
                          routeActions.redirectTo(routes.USER, { id: user.id })
                        )
                      }
                    />
                  </IconButton>
                  <IconButton>
                    <DeleteOutline onClick={() => handleDeleteUser(user)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default HomePage;
