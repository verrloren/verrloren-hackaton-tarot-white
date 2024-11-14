/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { z } from "zod";
import { DateInput } from "rsuite";
import { Input } from "./ui/input";
import Image from "next/image";
import { TarotCardType } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormErrorMessage } from "./ui/form-error-message";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { TeamType } from "../lib/types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  date: z.string().min(1, "Date is required"), // Adjust this according to your date input format
	team: z.string().min(1, "Team is required"),
});

type FormData = z.infer<typeof schema>;


interface TarotFormProps {
	taroCards: TarotCardType[];
	teams: TeamType[];
}



export function TarotForm({ taroCards, teams }: TarotFormProps) {

	const router = useRouter();
  const [cardError, setCardError] = useState<string | null>(null);
	
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (!selectedCard) {
      setCardError("Please select at least one tarot card.");
      return;
    }
    setCardError(null);
    const query = new URLSearchParams({
      name: data.name,
      surname: data.surname,
			team: data.team,
      date: data.date,
      selectedCard: JSON.stringify(selectedCard),
    }).toString();
    router.push(`/tarot/result?${query}`);

  };

  const handleCardSelect = (card: TarotCardType) => {
    setSelectedCard(card);
    if (selectedCard?.id === card.id) {
      setSelectedCard(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row items-start">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
          className="w-full flex flex-col items-start gap-y-4"
        >
          <h1 className="font-libreFranklin font-bold text-5xl text-white pt-12	pb-8">
            Details
          </h1>
          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
							font-lancelot text-neutral-200 text-xl pl-4 py-2
							 transition-colors duration-200 focus:outline-none
							placeholder:text-neutral-500 focus:placeholder:text-neutral-200 focus:bg-neutral-950"
          />
          {errors.name && <FormErrorMessage message={errors.name.message} />}
          <Input
            {...register("surname")}
            type="text"
            placeholder="Surname"
            className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
							font-lancelot text-neutral-200 text-xl pl-4 py-2
							 transition-colors duration-200 focus:outline-none
							placeholder:text-neutral-500 focus:placeholder:text-neutral-200 focus:bg-neutral-950"
											// font-libreFranklin
											// rounded-2xl pl-6 h-12 text-neutral-400 
											// placeholder:text-neutral-600 text-lg
											// hover:bg-neural-500
          />
          {errors.surname && (
            <FormErrorMessage message={errors.surname.message} />
          )}
					{/* @ts-expect-error */}
          <DateInput
            {...register("date")}
            className="w-full md:w-[85%] border bg-black border-neutral-950 
						rounded-xl shadow-inner
							font-lancelot text-neutral-200 text-xl pl-4 py-2
							transition-colors duration-200 focus:outline-none
							placeholder:text-neutral-500 neutral-800 focus:bg-neutral-950"
          />
          {errors.date && <FormErrorMessage message={errors.date.message} />}
        

				
				<select
          {...register('team')}
          className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
            font-lancelot text-neutral-200 text-xl pl-4 py-2
            transition-colors duration-200 focus:outline-none
            placeholder:text-neutral-500 focus:bg-neutral-950"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.team && <FormErrorMessage message={errors.team.message} />}

				</motion.div>





        {/*   	taro cards section		 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
          className="w-full flex items-start flex-col"
        >
          <h1 className="font-libreFranklin font-bold text-5xl text-white pt-12	pb-8">
            Choose card
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {taroCards.map((card, index) => (
              <motion.div
                key={index}
                onClick={() => handleCardSelect(card)}
                className={`relative cursor-pointer rounded-xl
									${
                    selectedCard?.id === card.id
                      ? "ring-4 ring-black radial-gradient-border-select"
                      : ""
                  }`}
              >
                <Image
                  width={100}
                  height={200}
                  src={card.url}
                  alt={card.name}
                  className="w-full h-full rounded-xl hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-2">
            {cardError && <FormErrorMessage message={cardError} />}
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
        className="my-10 bg-white hover:bg-[#0e0e0e] transition-colors duration-300 
				w-full h-full py-3
        rounded-xl font-libreFranklin text-black text-2xl duration-400"
      >
        Submit
			</motion.button>
					{/* <motion.div
					className="w-full mt-12"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
					>
				    <Button
        			type="submit"
              className="w-full  card-background-diff-direction 
							rounded-2xl h-12 text-3xl font-lancelot text-white
							hover:brightness-125 transition-all duration-300"
          	>
              <p className="text-radial-gradient-middle">Submit</p>
            </Button>
          </motion.div> */}
    </form>
  );
}