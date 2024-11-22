import type { PetDto } from "../../dto";
import { Entity } from "../abstracts";

type PetProps = {
	name: string;
	type: string;
	race: string;
	gender: string;
};

export class Pet extends Entity<PetProps> {
	static create(dto: PetDto) {
		return new Pet(
			{
				name: dto.name,
				type: dto.type,
				race: dto.race,
				gender: dto.gender,
			},
			dto.id,
		);
	}

	update(partialDto: Partial<PetDto>) {
		return Pet.create({
			...this.dto,
			...partialDto,
		});
	}

	get name(): string {
		return this.props.name;
	}

	get type(): string {
		return this.props.type;
	}

	get race(): string {
		return this.props.race;
	}

	get gender(): string {
		return this.props.gender;
	}

	get dto(): PetDto {
		return {
			id: this.id,
			name: this.props.name,
			type: this.props.type,
			race: this.props.race,
			gender: this.props.gender,
		};
	}
}
