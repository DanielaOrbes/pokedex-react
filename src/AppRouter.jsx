import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navegacion } from '../components/Navegacion';
import { HomePage, PokemonPage, SearchPage } from '../pages';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navegacion />}>
				<Route index element={<HomePage />} />
				<Route path='pokemon/:id' element={<PokemonPage />} />
				<Route path='search' element={<SearchPage />} />
			</Route>

            <Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};