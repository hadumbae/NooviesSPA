import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import PersonListCard from "@/pages/persons/components/PersonListCard.tsx";

interface Props {
    persons: Person[];
    onPersonDelete: () => void;
}

const PersonCardList: FC<Props> = ({persons, onPersonDelete}) => {
    return (
        persons.map((person) => <PersonListCard key={person._id} person={person} onPersonDelete={onPersonDelete} />)
    );
};

export default PersonCardList;
