import {FC} from 'react';
import useMovieCreditDeleteMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditDeleteMutation.ts";
import MovieCreditOptionsDropdown from "@/pages/moviecredit/components/dropdowns/MovieCreditOptionsDropdown.tsx";
import {useNavigate} from "react-router-dom";
import {PopulatedMovieCredit} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";

interface OptionsProps {
    credit: PopulatedMovieCredit;
}

const MoviePersonCardOptions: FC<OptionsProps> = ({credit}) => {
    const {_id: creditID, movie: {_id: movieID}} = credit;
    const navigate = useNavigate();

    const deleteMutation = useMovieCreditDeleteMutation({_id: creditID});

    const onEdit = () => navigate(`/admin/movies/get/${movieID}/people/edit/${creditID}`)
    const onDelete = () => deleteMutation.mutate();

    return (
        <MovieCreditOptionsDropdown onEdit={onEdit} onDelete={onDelete}/>
    );
};

export default MoviePersonCardOptions;
