import {FC} from 'react';
import useMovieCreditDeleteMutation from "@/pages/moviecredit/hooks/mutations/useMovieCreditDeleteMutation.ts";
import MovieCreditOptionsDropdown from "@/pages/moviecredit/components/dropdowns/MovieCreditOptionsDropdown.tsx";
import {useNavigate} from "react-router-dom";

import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface OptionsProps {
    credit: MovieCreditDetails;
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
