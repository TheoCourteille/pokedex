import { createClient } from '@supabase/supabase-js';

export const getUsers = async () => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').select('user_name, avatar, pokemons, id');

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data;
}

export const insertUser = async (user) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').insert(user[0]);

    if (error) {
        console.error('Error inserting user:', error);
    }

    return data;
}

export const getUserById = async (id) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').select('user_name, avatar, pokemons, id').eq('id', id);

    if (error) {
        console.error('Error fetching user by id:', error);
        return null;
    }

    return data[0];
}

export const getUserByName = async (name) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').select('user_name, avatar, pokemons, id').eq('user_name', name);

    if (error) {
        console.error('Error fetching user by name:', error);
        return null;
    }

    return data;
}

export const deleteUserById = async (id, password) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const rightPassword = await verifyUserPassword(id, password);

    if (!rightPassword) {
        console.error('Error during verification of user password for deletion: wrong password');
        return false;
    }

    const { error: deleteError } = await supabase.from('user').delete().eq('id', id);

    if (deleteError) {
        console.error('Error deleting user by id:', deleteError);
        return false;
    }

    return true;
}

export const verifyUserPassword = async (id, password) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').select('user_password').eq('id', id).single();

    if (error) {
        console.error('Error fetching user password:', error);
        return false;
    }

    return Boolean(data && data.user_password === password);
}

export const getPokemonsFromUserId = async (id) => {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

    const { data, error } = await supabase.from('user').select('pokemons').eq('id', id);

    if (error) {
        console.error('Error fetching pokemons from user id:', error);
        return { pokemons: [] };
    }

    return data[0] || { pokemons: [] };
}

export const addPokemonToCurentUser = async (id, pokemon) => {
    const user = await getCurrentUser();
    if (user) {
        const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
        
        const updatedPokemons = [...(user.pokemons ? user.pokemons : []), { id, pokemon}];

        const { error } = await supabase.from('user').update({ pokemons: updatedPokemons }).eq('id', user.id);

        if (error) {
            console.error('Error adding pokemon to current user:', error);
            return;
        }

        const updatedUser = await getUserById(user.id);
        setCurrentUserInLocalStorage(updatedUser);
    }
}

export const deletePokemonFromCurrentUser = async (pokemonId) => {
    const user = getCurrentUser();
    if (user) {
        const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

        const updatedPokemons = (user.pokemons ? user.pokemons : []).filter(p => p.id !== pokemonId);

        const { error } = await supabase.from('user').update({ pokemons: updatedPokemons }).eq('id', user.id);

        if (error) {
            console.error('Error deleting pokemon from current user:', error);
        }

        const updatedUser = await getUserById(user.id);
        setCurrentUserInLocalStorage(updatedUser);
    }
}

export const setCurrentUserInLocalStorage = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

export const removeCurrentUser = () => {
    localStorage.removeItem('currentUser')
}