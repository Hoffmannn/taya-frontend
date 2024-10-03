import { useDispatch, useSelector } from "react-redux";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
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
                <TableCell>{user.nome}</TableCell>
                <TableCell>{calculateAge(user.dataNascimento)}</TableCell>
                <TableCell>
                  {user.cidade}/{user.uf}
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
